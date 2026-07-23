function json(data, status = 200, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

function unauthorized(cors) {
  return json({ error: "Unauthorized" }, 401, cors);
}

function notFound(cors) {
  return json({ error: "Not found" }, 404, cors);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const path = url.pathname.replace(/\/+$/, "") || "/";

    const getAuth = () => {
      const header = request.headers.get("Authorization") || "";
      return header.startsWith("Bearer ") ? header.slice(7) : null;
    };

    const requireAdmin = () => {
      const token = getAuth();
      return token && token === env.ADMIN_TOKEN;
    };

    if (request.method === "GET" && path === "/") {
      const raw = await env.GUESTBOOK.get("messages", "text");
      const allMessages = raw ? JSON.parse(raw) : [];

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

      return json({ messages, total, page, totalPages }, 200, cors);
    }

    if (request.method === "GET" && path === "/admin/pending") {
      if (!requireAdmin()) return unauthorized(cors);

      const raw = await env.GUESTBOOK.get("messages", "text");
      const allMessages = raw ? JSON.parse(raw) : [];

      const pending = allMessages.filter((m) => m.approved === false);

      return json({ messages: pending }, 200, cors);
    }

    if (request.method === "PATCH") {
      const match = path.match(/^\/admin\/approve\/(\d+)$/);
      if (match) {
        if (!requireAdmin()) return unauthorized(cors);

        const id = parseInt(match[1], 10);
        const raw = await env.GUESTBOOK.get("messages", "text");
        const messages = raw ? JSON.parse(raw) : [];
        const idx = messages.findIndex((m) => m.id === id);

        if (idx === -1) return notFound(cors);

        messages[idx].approved = true;
        await env.GUESTBOOK.put("messages", JSON.stringify(messages));

        return json({ ok: true }, 200, cors);
      }
    }

    if (request.method === "DELETE") {
      const match = path.match(/^\/admin\/delete\/(\d+)$/);
      if (match) {
        if (!requireAdmin()) return unauthorized(cors);

        const id = parseInt(match[1], 10);
        const raw = await env.GUESTBOOK.get("messages", "text");
        const messages = raw ? JSON.parse(raw) : [];
        const idx = messages.findIndex((m) => m.id === id);

        if (idx === -1) return notFound(cors);

        messages.splice(idx, 1);
        await env.GUESTBOOK.put("messages", JSON.stringify(messages));

        return json({ ok: true }, 200, cors);
      }
    }

    if (request.method === "POST" && path === "/") {
      const { name, message } = await request.json();
      if (typeof message !== "string" || !message.trim()) {
        return json({ error: "Message required" }, 400, cors);
      }

      const raw = await env.GUESTBOOK.get("messages", "text");
      const messages = raw ? JSON.parse(raw) : [];

      messages.push({
        id: Date.now(),
        name: (name?.trim() || "").slice(0, 50),
        message: message.trim().slice(0, 1000),
        timestamp: new Date().toISOString(),
        approved: false,
      });

      await env.GUESTBOOK.put("messages", JSON.stringify(messages));

      return json({ ok: true }, 200, cors);
    }

    return notFound(cors);
  },
};
