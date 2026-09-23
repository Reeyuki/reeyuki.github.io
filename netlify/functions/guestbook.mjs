import { getStore } from "@netlify/blobs";
import seedMessages from "./seed.json" with { type: "json" };

const STORE_NAME = "guestbook";
const STORE_KEY = "messages";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

const unauthorized = () => json({ error: "Unauthorized" }, 401);
const notFound = () => json({ error: "Not found" }, 404);

async function loadMessages() {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const stored = await store.get(STORE_KEY, { type: "json" });
  if (Array.isArray(stored)) return { store, messages: stored };
  // First run: seed from bundled snapshot (exported from the old worker).
  // Snapshot is newest-first (API order); store oldest-first like the worker did.
  const seed = Array.isArray(seedMessages) ? [...seedMessages].reverse() : [];
  await store.setJSON(STORE_KEY, seed);
  return { store, messages: seed };
}

function requireAdmin(req) {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  const expected = process.env.ADMIN_TOKEN;
  return Boolean(token && expected && token === expected);
}

// /.netlify/functions/guestbook/<subpath>  or  /api/guestbook/<subpath>
function subPath(url) {
  const marker = "/guestbook";
  const idx = url.pathname.indexOf(marker);
  const rest = idx === -1 ? "/" : url.pathname.slice(idx + marker.length);
  return (rest.replace(/\/+$/, "") || "/");
}

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders() });
  }

  const url = new URL(req.url);
  const path = subPath(url);

  if (req.method === "GET" && path === "/") {
    const { messages: allMessages } = await loadMessages();
    const visible = allMessages.filter((m) => m.approved !== false);
    visible.reverse();

    const page = Math.max(1, parseInt(url.searchParams.get("page")) || 1);
    const limit = Math.min(
      50,
      Math.max(1, parseInt(url.searchParams.get("limit")) || 10),
    );
    const total = visible.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const messages = visible.slice(start, start + limit);

    return json({ messages, total, page, totalPages });
  }

  if (req.method === "GET" && path === "/admin/pending") {
    if (!requireAdmin(req)) return unauthorized();
    const { messages: allMessages } = await loadMessages();
    return json({ messages: allMessages.filter((m) => m.approved === false) });
  }

  if (req.method === "PATCH") {
    const match = path.match(/^\/admin\/approve\/(\d+)$/);
    if (match) {
      if (!requireAdmin(req)) return unauthorized();
      const id = parseInt(match[1], 10);
      const { store, messages } = await loadMessages();
      const idx = messages.findIndex((m) => m.id === id);
      if (idx === -1) return notFound();
      messages[idx].approved = true;
      await store.setJSON(STORE_KEY, messages);
      return json({ ok: true });
    }
  }

  if (req.method === "DELETE") {
    const match = path.match(/^\/admin\/delete\/(\d+)$/);
    if (match) {
      if (!requireAdmin(req)) return unauthorized();
      const id = parseInt(match[1], 10);
      const { store, messages } = await loadMessages();
      const idx = messages.findIndex((m) => m.id === id);
      if (idx === -1) return notFound();
      messages.splice(idx, 1);
      await store.setJSON(STORE_KEY, messages);
      return json({ ok: true });
    }
  }

  if (req.method === "POST" && path === "/") {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Message required" }, 400);
    }
    const { name, message } = body || {};
    if (typeof message !== "string" || !message.trim()) {
      return json({ error: "Message required" }, 400);
    }
    const { store, messages } = await loadMessages();
    messages.push({
      id: Date.now(),
      name: (name?.trim() || "").slice(0, 50),
      message: message.trim().slice(0, 1000),
      timestamp: new Date().toISOString(),
      approved: false,
    });
    await store.setJSON(STORE_KEY, messages);
    return json({ ok: true });
  }

  return notFound();
};

export const config = {
  path: ["/api/guestbook", "/api/guestbook/*"],
};
