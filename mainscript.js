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
  soulthera: { current: 0, interval: null, duration: 8000 },
  voraxoid: { current: 0, interval: null, duration: 8000 },
  yukios: { current: 0, interval: null, duration: 8000 },
  putitback: { current: 0, interval: null, duration: 8000 },
  yukicord: { current: 0, interval: null, duration: 8000 },
  gnome: { current: 0, interval: null, duration: 8000 },
};
function getState(gameId) {
  if (!slideshows[gameId]) {
    slideshows[gameId] = { current: 0, interval: null, duration: 8000 };
  }
  return slideshows[gameId];
}
function getSlides(gameId) {
  return document.querySelectorAll(`#slideshow-${gameId} .slide`);
}
function getDots(gameId) {
  return document.querySelectorAll(`#dots-${gameId} .dot`);
}
function hydrateSlideImg(slide) {
  if (!slide) return;
  const img = slide.querySelector("img[data-src]");
  if (img && img.dataset.src) {
    let url = img.dataset.src;
    if (
      window.__isLocal &&
      url.includes("cdn.jsdelivr.net/gh/Reeyuki/GnomeInBrowser")
    ) {
      url = "/static/gnome/g3.webp";
    }
    img.src = url;
    img.removeAttribute("data-src");
    img.loading = "eager";
  }
}
function goToSlide(gameId, index) {
  const state = getState(gameId);

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

  if (slides[targetIndex]) {
    hydrateSlideImg(slides[targetIndex]);
    // preload next slide
    const next = slides[(targetIndex + 1) % total];
    hydrateSlideImg(next);
    slides[targetIndex].classList.add("active");
  }

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === targetIndex);
  });
}
function nextSlide(gameId) {
  const state = getState(gameId);
  goToSlide(gameId, state.current + 1);
}
function prevSlide(gameId) {
  const state = getState(gameId);
  goToSlide(gameId, state.current - 1);
}
function startSlideshow(gameId) {
  const state = getState(gameId);
  if (state.interval) clearInterval(state.interval);
  goToSlide(gameId, 0);
  state.interval = setInterval(() => nextSlide(gameId), state.duration);
}

document.addEventListener("DOMContentLoaded", () => {
  // Grid view: all projects visible, start a slideshow per panel.
  document.querySelectorAll(".project-panel[id^='panel-']").forEach((panel) => {
    const game = panel.id.replace("panel-", "");
    if (document.getElementById("slideshow-" + game)) {
      startSlideshow(game);
    }
  });

  // Truncate long explanations: collapsed by default, "read more" toggles.
  document.querySelectorAll(".project-panel").forEach((panel) => {
    const info = panel.querySelector(".game-info");
    if (!info) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "read-more-btn";
    btn.textContent = "+ read more";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const expanded = panel.classList.toggle("expanded");
      btn.textContent = expanded ? "− read less" : "+ read more";
    });
    const playBtn = info.querySelector(".play-btn");
    info.insertBefore(btn, playBtn);
  });

  // Click-to-open modal with full details + permalink hash.
  const modal = document.createElement("div");
  modal.className = "project-modal";
  modal.id = "project-modal";
  modal.hidden = true;
  modal.innerHTML =
    '<div class="project-modal-backdrop"></div>' +
    '<div class="project-modal-card" role="dialog" aria-modal="true">' +
    '<button class="project-modal-close" type="button">✕</button>' +
    '<div class="project-modal-body"></div></div>';
  document.body.appendChild(modal);
  const modalBody = modal.querySelector(".project-modal-body");

  // URLs use the bare project name (e.g. #yukios); DOM ids stay panel-<name>.
  function hashToPanelId(hash) {
    if (!hash) return null;
    if (document.getElementById(hash)?.classList?.contains("project-panel"))
      return hash;
    const prefixed = "panel-" + hash;
    if (document.getElementById(prefixed)) return prefixed;
    return null;
  }

  function closeModal() {
    modal.hidden = true;
    modalBody.innerHTML = "";
    if (hashToPanelId(location.hash.replace("#", ""))) {
      history.pushState(null, "", location.pathname + location.search);
    }
  }

  function openModal(panelId, push) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const title = panel.querySelector(".game-name")?.textContent?.trim() ?? panelId;
    const desc = panel.querySelector(".game-desc")?.innerHTML ?? "";
    const features = panel.querySelector(".game-features")?.outerHTML ?? "";
    const note = panel.querySelector(".game-note")?.outerHTML ?? "";
    const link = panel.querySelector(".play-btn")?.outerHTML ?? "";
    // Collect slides (resolve lazy data-src, skip placeholders).
    const slides = Array.from(
      panel.querySelectorAll(".slideshow-wrapper .slide"),
    )
      .map((s) => {
        const img = s.querySelector("img");
        if (!img) return null;
        let src = img.dataset?.src || img.src || "";
        if (window.__isLocal && src.includes("cdn.jsdelivr.net/gh/Reeyuki/GnomeInBrowser")) {
          src = "/static/gnome/g3.webp";
        }
        if (!src || src.startsWith("data:")) return null;
        return {
          src,
          alt: img.alt || title,
          caption: s.querySelector(".slide-caption p")?.textContent?.trim() ?? "",
        };
      })
      .filter(Boolean);
    const liveEmbed = panel.querySelector(".slideshow-wrapper iframe")?.outerHTML ?? "";
    let media = "";
    if (slides.length > 0) {
      const dots = slides
        .map((_, i) => `<div class="dot${i === 0 ? " active" : ""}" data-index="${i}"></div>`)
        .join("");
      media =
        `<div class="modal-slideshow">` +
        `<img src="${slides[0].src}" alt="${slides[0].alt}" />` +
        `<button class="modal-nav prev-btn" type="button" aria-label="Previous slide">◀</button>` +
        `<button class="modal-nav next-btn" type="button" aria-label="Next slide">&gt;</button>` +
        `<div class="modal-counter">1 / ${slides.length}</div>` +
        `<div class="modal-caption">${slides[0].caption}</div>` +
        `<div class="modal-dots">${dots}</div></div>`;
    } else if (liveEmbed) {
      media = `<div class="modal-slideshow">${liveEmbed}</div>`;
    }
    modalBody.innerHTML =
      media +
      `<div class="game-name">${title}</div>` +
      `<p class="game-desc" style="display:block;-webkit-line-clamp:unset">${desc}</p>` +
      features +
      note +
      link;
    // Unhide features/note inside modal (page CSS hides them in cards).
    modalBody.querySelectorAll(".game-features, .game-note").forEach((el) => {
      el.style.display = el.classList.contains("game-features") ? "flex" : "block";
    });
    // Wire modal slideshow controls.
    if (slides.length > 1) {
      let idx = 0;
      const imgEl = modalBody.querySelector(".modal-slideshow img");
      const capEl = modalBody.querySelector(".modal-caption");
      const countEl = modalBody.querySelector(".modal-counter");
      const dotEls = Array.from(modalBody.querySelectorAll(".modal-dots .dot"));
      const show = (n) => {
        idx = ((n % slides.length) + slides.length) % slides.length;
        imgEl.src = slides[idx].src;
        imgEl.alt = slides[idx].alt;
        if (capEl) capEl.textContent = slides[idx].caption;
        if (countEl) countEl.textContent = `${idx + 1} / ${slides.length}`;
        dotEls.forEach((d, i) => d.classList.toggle("active", i === idx));
      };
      modalBody.querySelector(".modal-nav.prev-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        show(idx - 1);
      });
      modalBody.querySelector(".modal-nav.next-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        show(idx + 1);
      });
      dotEls.forEach((d) => {
        d.addEventListener("click", (e) => {
          e.stopPropagation();
          show(Number(d.dataset.index));
        });
      });
    }
    modal.hidden = false;
    if (push) history.pushState(null, "", "#" + panelId.replace(/^panel-/, ""));
  }

  modal.querySelector(".project-modal-backdrop").addEventListener("click", closeModal);
  modal.querySelector(".project-modal-close").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowLeft")
      modalBody.querySelector(".modal-nav.prev-btn")?.click();
    else if (e.key === "ArrowRight")
      modalBody.querySelector(".modal-nav.next-btn")?.click();
  });

  document.querySelectorAll(".project-panel").forEach((panel) => {
    const opener = panel.querySelector(".slideshow-wrapper");
    if (opener) {
      opener.addEventListener("click", (e) => {
        if (e.target.closest(".slide-nav, .dot, a, button, iframe")) return;
        openModal(panel.id, true);
      });
    }
    panel.querySelector(".game-name a")?.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(panel.id, true);
    });
  });

  window.addEventListener("hashchange", () => {
    const id = hashToPanelId(location.hash.replace("#", ""));
    if (id) {
      openModal(id, false);
    } else if (!modal.hidden) {
      closeModal();
    }
  });

  const fromHash = hashToPanelId(location.hash.replace("#", ""));
  if (fromHash) {
    openModal(fromHash, false);
  }

  document.querySelectorAll(".slide-nav").forEach((btn) => {
    btn.addEventListener("click", () => {
      const game = btn.dataset.target;
      const state = getState(game);
      if (state.interval) {
        clearInterval(state.interval);
        state.interval = null;
      }
      if (btn.classList.contains("prev-btn")) {
        prevSlide(game);
      } else if (btn.classList.contains("next-btn")) {
        nextSlide(game);
      }
    });
  });
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const dotsContainer = dot.closest(".slide-dots");
      if (!dotsContainer) return;
      const game = dotsContainer.id.replace("dots-", "");
      const state = getState(game);
      if (state.interval) {
        clearInterval(state.interval);
        state.interval = null;
      }
      const idx = Number(dot.dataset.index);
      if (Number.isFinite(idx)) goToSlide(game, idx);
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
  img.width = 160;
  img.height = 160;
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
