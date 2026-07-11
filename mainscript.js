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

document.getElementById("toggle-purple")?.addEventListener("click", () => {
  const link = document.getElementById("purple-theme");
  if (!link) return;
  link.href = link.href.endsWith("style-purple.css") ? "" : "style-purple.css";
  const iframe = document.getElementById("gb-iframe");
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(
      { type: "theme", purple: link.href.endsWith("style-purple.css") },
      "*",
    );
  }
});
