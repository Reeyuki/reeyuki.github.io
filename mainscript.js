const sparkles = [];
document.addEventListener("mousemove", (e) => {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = e.clientX - 4 + "px";
  sparkle.style.top = e.clientY - 4 + "px";
  sparkle.style.background = `hsl(${Math.random() * 60 + 160}, 80%, 70%)`;
  document.body.appendChild(sparkle);
  sparkles.push(sparkle);
  if (sparkles.length > 60) {
    const old = sparkles.shift();
    old?.remove();
  }
  setTimeout(() => {
    sparkle.remove();
    const i = sparkles.indexOf(sparkle);
    if (i > -1) sparkles.splice(i, 1);
  }, 500);
});

const slideshows = {
  voraxoid: { current: 0, interval: null, duration: 4000 },
  soulthera: { current: 0, interval: null, duration: 4000 },
  yukios: { current: 0, interval: null, duration: 4000 },
  liventcord: { current: 0, interval: null, duration: 4000 },
};
function getSlides(gameId) {
  return document.querySelectorAll(`#slideshow-${gameId} .slide`);
}
function getDots(gameId) {
  return document.querySelectorAll(`#dots-${gameId} .dot`);
}
function goToSlide(gameId, index) {
  const state = slideshows[gameId];
  if (!state) return;

  const slides = Array.from(getSlides(gameId));
  const dots = Array.from(getDots(gameId));

  const total = slides.length;
  if (total === 0) return;

  let targetIndex = Number(index);
  if (!Number.isFinite(targetIndex)) targetIndex = 0;

  targetIndex = ((targetIndex % total) + total) % total;

  const prevIdx = state.current ?? 0;

  if (slides[prevIdx]) {
    slides[prevIdx].classList.remove("active");
    slides[prevIdx].classList.add("prev");

    const prevEl = slides[prevIdx];
    setTimeout(() => {
      if (prevEl) prevEl.classList.remove("prev");
    }, 900);
  }

  state.current = targetIndex;

  if (slides[targetIndex]) slides[targetIndex].classList.add("active");

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === targetIndex);
  });
}
function nextSlide(gameId) {
  const state = slideshows[gameId];
  if (!state) return;
  goToSlide(gameId, state.current + 1);
}
function prevSlide(gameId) {
  const state = slideshows[gameId];
  if (!state) return;
  goToSlide(gameId, state.current - 1);
}
function startSlideshow(gameId) {
  const state = slideshows[gameId];
  if (!state) return;
  if (state.interval) clearInterval(state.interval);
  goToSlide(gameId, 0);
  state.interval = setInterval(() => nextSlide(gameId), state.duration);
}

document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".project-tab");
  const tabPanels = document.querySelectorAll(".project-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const game = this.dataset.game;
      tabBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      tabPanels.forEach((p) => p.classList.remove("active"));
      const target = document.getElementById("panel-" + game);
      if (target) target.classList.add("active");
      if (game === "voraxoid" || game === "soulthera" || game === "yukios") {
        startSlideshow(game);
      }
    });
  });

  if (tabBtns.length > 0) {
    tabBtns[0].click();
  }

  document.querySelectorAll(".slide-nav").forEach((btn) => {
    btn.addEventListener("click", () => {
      const game = btn.dataset.target;
      if (btn.classList.contains("prev-btn")) {
        prevSlide(game);
      } else if (btn.classList.contains("next-btn")) {
        nextSlide(game);
      }
    });
  });
});

const ladderContainer = document.getElementById("ladder-container");
const MAX_LADDERS = 600;
let ladderCount = 0;
let isLoading = false;

function addLadderImage() {
  if (ladderCount >= MAX_LADDERS) return;

  const img = document.createElement("img");
  img.src = "/static/ladder.webp";
  img.alt = "Ladder";
  img.className = "ladder-image";
  ladderContainer.appendChild(img);
  ladderCount++;
}

function handleScroll() {
  if (isLoading || ladderCount >= MAX_LADDERS) return;

  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight - 500) {
    isLoading = true;
    for (let i = 0; i < 60; i++) {
      addLadderImage();
    }
    setTimeout(() => {
      isLoading = false;
    }, 100);
  }
}

for (let i = 0; i < 50; i++) {
  addLadderImage();
}

const GUESTBOOK_URL = "https://reeyuki-guestbook.liventcord-a60.workers.dev/";

const gbForm = document.getElementById("gb-form");
const gbMessages = document.getElementById("gb-messages");
const gbPagination = document.getElementById("gb-pagination");
const nameInput = document.getElementById("gb-name");
const msgInput = document.getElementById("gb-message");

let gbCurrentPage = 1;
let gbTotalPages = 1;
let gbLimit = 10;

const gbLimitSelect = document.getElementById("gb-limit");

async function loadMessages(page) {
  gbCurrentPage = page || 1;
  try {
    const res = await fetch(
      `${GUESTBOOK_URL}?page=${gbCurrentPage}&limit=${gbLimit}`,
    );
    if (!res.ok) throw new Error("fetch failed");
    const data = await res.json();
    const messages = data.messages;
    gbTotalPages = data.totalPages;
    gbMessages.innerHTML = messages
      .toReversed()
      .map(
        (m) =>
          `<div class="gb-entry"><div class="gb-entry-name">${m.name ? esc(m.name) : "\u200E"}</div><div class="gb-entry-text">${esc(m.message)}</div><div class="gb-entry-time">${new Date(m.timestamp).toLocaleDateString()}</div></div>`,
      )
      .join("");
    renderPagination();
  } catch {
    gbMessages.innerHTML =
      '<p style="color:var(--accent2)">could not load messages</p>';
  }
}

function renderPagination() {
  if (!gbPagination) return;
  if (gbTotalPages <= 1) {
    gbPagination.innerHTML = "";
    return;
  }
  const pages = [];
  if (gbTotalPages <= 7) {
    for (let i = 1; i <= gbTotalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (gbCurrentPage > 3) pages.push("...");
    const start = Math.max(2, gbCurrentPage - 1);
    const end = Math.min(gbTotalPages - 1, gbCurrentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (gbCurrentPage < gbTotalPages - 2) pages.push("...");
    pages.push(gbTotalPages);
  }
  gbPagination.innerHTML = [
    `<button class="gb-page-btn" data-page="${gbCurrentPage - 1}" ${gbCurrentPage <= 1 ? "disabled" : ""}>&lt;</button>`,
    ...pages
      .map((p) =>
        p === "..."
          ? `<span class="gb-page-ellipsis">…</span>`
          : `<button class="gb-page-btn${p === gbCurrentPage ? " active" : ""}" data-page="${p}">${p}</button>`,
      )
      .join(""),
    `<button class="gb-page-btn" data-page="${gbCurrentPage + 1}" ${gbCurrentPage >= gbTotalPages ? "disabled" : ""}>&gt;</button>`,
  ].join("");
}

gbPagination?.addEventListener("click", (e) => {
  const btn = e.target.closest(".gb-page-btn");
  if (!btn || btn.disabled) return;
  const page = parseInt(btn.dataset.page);
  if (page >= 1 && page <= gbTotalPages) {
    loadMessages(page);
  }
});

gbLimitSelect?.addEventListener("change", () => {
  gbLimit = parseInt(gbLimitSelect.value);
  loadMessages(1);
});

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

document.getElementById("toggle-purple")?.addEventListener("click", () => {
  const link = document.getElementById("purple-theme");
  if (!link) return;
  link.href = link.href.endsWith("style-purple.css") ? "" : "style-purple.css";
});

gbForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = msgInput.value.trim();
  if (!message) return;

  try {
    const res = await fetch(GUESTBOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    if (!res.ok) throw new Error("post failed");
    nameInput.value = "";
    msgInput.value = "";
    const notice = document.createElement("p");
    notice.style.cssText = "color:var(--accent2);margin:0;font-style:italic;";
    notice.textContent = "Thanks, your comment will be reviewed";
    gbMessages.before(notice);
    setTimeout(() => notice.remove(), 6000);
  } catch {
    alert("failed to send message");
  }
});

loadMessages(1);
