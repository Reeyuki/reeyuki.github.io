const FX = {
  on: true,
  reduced: false,
};
try {
  FX.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  FX.on = localStorage.getItem("reeyuki-fx") !== "off" && !FX.reduced;
} catch (e) {}
if (!FX.on) document.body.classList.add("fx-off");
const sparkles = [];
let lastSpark = 0;
document.addEventListener("mousemove", (e) => {
  if (!FX.on) return;
  const now = performance.now();
  if (now - lastSpark < 80) return;
  lastSpark = now;
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = e.clientX - 4 + "px";
  sparkle.style.top = e.clientY - 4 + "px";
  sparkle.style.background = `hsl(${Math.random() * 60 + 160}, 80%, 70%)`;
  document.body.appendChild(sparkle);
  sparkles.push(sparkle);
  if (sparkles.length > 24) {
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
  soulthera: { current: 0, interval: null, duration: 8e3 },
  voraxoid: { current: 0, interval: null, duration: 8e3 },
  yukios: { current: 0, interval: null, duration: 8e3 },
  putitback: { current: 0, interval: null, duration: 8e3 },
  yukicord: { current: 0, interval: null, duration: 8e3 },
  gnome: { current: 0, interval: null, duration: 8e3 },
};
function getState(gameId) {
  if (!slideshows[gameId]) {
    slideshows[gameId] = { current: 0, interval: null, duration: 8e3 };
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
  document.querySelectorAll(".project-panel[id^='panel-']").forEach((panel) => {
    const game = panel.id.replace("panel-", "");
    if (document.getElementById("slideshow-" + game)) {
      startSlideshow(game);
    }
  });
  document.querySelectorAll(".project-panel").forEach((panel) => {
    if (panel.classList.contains("project-featured")) {
      panel.classList.add("expanded");
    }
    const info = panel.querySelector(".game-info");
    if (!info) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "details-btn";
    btn.textContent = "full details";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(panel.id, true);
    });
    const playBtn = info.querySelector(".play-btn");
    info.insertBefore(btn, playBtn);
  });
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
    delete document.body.dataset.project;
    if (hashToPanelId(location.hash.replace("#", ""))) {
      history.pushState(null, "", location.pathname + location.search);
    }
  }
  function openModal(panelId, push) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    document.body.dataset.project = panelId.replace(/^panel-/, "");
    const title =
      panel.querySelector(".game-name")?.textContent?.trim() ?? panelId;
    const desc = panel.querySelector(".game-desc")?.innerHTML ?? "";
    const features = panel.querySelector(".game-features")?.outerHTML ?? "";
    const note = panel.querySelector(".game-note")?.outerHTML ?? "";
    const link = panel.querySelector(".play-btn")?.outerHTML ?? "";
    const slides = Array.from(
      panel.querySelectorAll(".slideshow-wrapper .slide"),
    )
      .map((s) => {
        const img = s.querySelector("img");
        if (!img) return null;
        let src = img.dataset?.src || img.src || "";
        if (
          window.__isLocal &&
          src.includes("cdn.jsdelivr.net/gh/Reeyuki/GnomeInBrowser")
        ) {
          src = "/static/gnome/g3.webp";
        }
        if (!src || src.startsWith("data:")) return null;
        return {
          src: src,
          alt: img.alt || title,
          caption:
            s.querySelector(".slide-caption p")?.textContent?.trim() ?? "",
        };
      })
      .filter(Boolean);
    const liveEmbed =
      panel.querySelector(".slideshow-wrapper iframe")?.outerHTML ?? "";
    let media = "";
    if (slides.length > 0) {
      const dots = slides
        .map(
          (_, i) =>
            `<div class="dot${i === 0 ? " active" : ""}" data-index="${i}"></div>`,
        )
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
    modalBody.querySelectorAll(".game-features, .game-note").forEach((el) => {
      el.style.display = el.classList.contains("game-features")
        ? "flex"
        : "block";
    });
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
      modalBody
        .querySelector(".modal-nav.prev-btn")
        ?.addEventListener("click", (e) => {
          e.stopPropagation();
          show(idx - 1);
        });
      modalBody
        .querySelector(".modal-nav.next-btn")
        ?.addEventListener("click", (e) => {
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
  modal
    .querySelector(".project-modal-backdrop")
    .addEventListener("click", closeModal);
  modal
    .querySelector(".project-modal-close")
    .addEventListener("click", closeModal);
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
function notifyThemeIframe() {
  const purpleOn = document
    .getElementById("purple-theme")
    ?.href.endsWith("style-purple.css");
  const iframe = document.getElementById("gb-iframe");
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(
      { type: "theme", purple: !!purpleOn },
      "*",
    );
  }
}
document.getElementById("toggle-purple")?.addEventListener("click", () => {
  const link = document.getElementById("purple-theme");
  if (!link) return;
  const on = !link.href.endsWith("style-purple.css");
  link.href = on ? "style-purple.css" : "";
  if (on) {
    const pip = document.getElementById("pipboy-theme");
    if (pip) pip.href = "";
  }
  notifyThemeIframe();
});
document.getElementById("toggle-pipboy")?.addEventListener("click", () => {
  const link = document.getElementById("pipboy-theme");
  if (!link) return;
  const on = !link.href.endsWith("style-pipboy.css");
  link.href = on ? "style-pipboy.css" : "";
  if (on) {
    const purple = document.getElementById("purple-theme");
    if (purple) purple.href = "";
  }
  notifyThemeIframe();
});
/* ===== WOW FX PACK ===== */
(function initFx() {
  const fxBtn = document.getElementById("toggle-fx");
  const syncBtn = () => {
    if (fxBtn) fxBtn.textContent = FX.on ? "FX: ON" : "FX: OFF";
  };
  syncBtn();
  fxBtn?.addEventListener("click", () => {
    FX.on = !FX.on;
    document.body.classList.toggle("fx-off", !FX.on);
    try {
      localStorage.setItem("reeyuki-fx", FX.on ? "on" : "off");
    } catch (e) {}
    syncBtn();
    if (FX.on)
      requestAnimationFrame(() => document.body.classList.remove("fx-off"));
  });

  // typing tagline
  const tag = document.getElementById("typing-tagline");
  const phrases = [
    "i make games_",
    "cozy tidy sims_",
    "survival arenas_",
    "browser OSes_",
    "weird web stuff_",
  ];
  if (tag && FX.on) {
    let pi = 0,
      ci = phrases[0].length,
      del = true;
    setInterval(() => {
      if (!FX.on) return;
      const cur = phrases[pi];
      if (del) {
        ci -= 1;
        if (ci <= 0) {
          del = false;
          pi = (pi + 1) % phrases.length;
          ci = 0;
        }
        tag.textContent = cur.slice(0, Math.max(ci, 0));
      } else {
        ci += 1;
        const next = phrases[pi];
        tag.textContent = next.slice(0, ci);
        if (ci >= next.length) del = true;
      }
    }, 90);
  }

  // xp scroll bar
  const fill = document.getElementById("xp-fill");
  const onScrollBar = () => {
    if (!fill) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    fill.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  addEventListener("scroll", onScrollBar, { passive: true });
  onScrollBar();

  // scroll reveal
  const revealEls = document.querySelectorAll(
    ".project-panel, #sec-about .feature-card, #sec-footer-links, #sec-comments",
  );
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", Math.min((i % 4) * 60, 240) + "ms");
  });
  if ("IntersectionObserver" in window && FX.reduced === false) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in-view");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // retro selection-cursor corners on every card (CSS :hover reveals them)
  document.querySelectorAll(".project-panel").forEach((panel) => {
    ["tl", "tr", "bl", "br"].forEach((pos) => {
      const c = document.createElement("i");
      c.className = "corner " + pos;
      c.setAttribute("aria-hidden", "true");
      panel.appendChild(c);
    });
  });

  // tilt (desktop pointers only)
  if (matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".project-panel").forEach((panel) => {
      panel.classList.add("tilt");
      let raf = 0;
      panel.addEventListener("mousemove", (e) => {
        if (!FX.on) return;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = panel.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          panel.style.transform = `translateY(-3px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
        });
      });
      panel.addEventListener("mouseleave", () => {
        cancelAnimationFrame(raf);
        panel.style.transform = "";
      });
    });

    // magnetic play buttons
    document.querySelectorAll(".play-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        if (!FX.on) return;
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${(dx * 0.12).toFixed(1)}px, ${(dy * 0.18).toFixed(1)}px) scale(1.03)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // click pixel burst (gated, tiny)
  const burstColors = () => {
    const cs = getComputedStyle(document.body);
    return [
      cs.getPropertyValue("--accent").trim() || "#66e6c8",
      cs.getPropertyValue("--accent2").trim() || "#d96bb3",
    ];
  };
  document.addEventListener("click", (e) => {
    if (!FX.on) return;
    const t = e.target.closest?.(".play-btn, .side-btn, .slide-nav, .dot");
    if (!t) return;
    t.classList.add("fx-press");
    setTimeout(() => {
      t.classList.remove("fx-press");
      t.style.transform = "";
    }, 140);
    const [c1, c2] = burstColors();
    for (let i = 0; i < 8; i++) {
      const p = document.createElement("div");
      p.className = "fx-burst";
      p.style.background = i % 2 ? c1 : c2;
      p.style.left = e.clientX + "px";
      p.style.top = e.clientY + "px";
      document.body.appendChild(p);
      const ang = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
      const dist = 22 + Math.random() * 26;
      p.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          {
            transform: `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist - 8}px) scale(0.2)`,
            opacity: 0,
          },
        ],
        { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" },
      ).onfinish = () => p.remove();
      setTimeout(() => p.remove(), 600);
    }
  });

  // pixel starfield
  const canvas = document.getElementById("starfield");
  if (canvas && FX.on) {
    const ctx = canvas.getContext("2d");
    let stars = [];
    let running = true;
    const resize = () => {
      canvas.width = Math.floor(innerWidth / 2);
      canvas.height = Math.floor(innerHeight / 2);
      stars = Array.from({ length: Math.min(40, innerWidth / 28) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() < 0.85 ? 1 : 2,
        v: 0.08 + Math.random() * 0.3,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    addEventListener("resize", resize);
    const tick = () => {
      if (!running) return;
      if (!FX.on) {
        requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accent =
        getComputedStyle(document.body).getPropertyValue("--accent").trim() ||
        "#66e6c8";
      ctx.fillStyle = accent;
      for (const st of stars) {
        st.y -= st.v;
        st.tw += 0.05;
        if (st.y < -2) {
          st.y = canvas.height + 2;
          st.x = Math.random() * canvas.width;
        }
        ctx.globalAlpha = 0.25 + Math.abs(Math.sin(st.tw)) * 0.5;
        ctx.fillRect(st.x | 0, st.y | 0, st.s, st.s);
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    };
    // pause offscreen / hidden tab
    new IntersectionObserver((en) => {
      running = en[0].isIntersecting || document.visibilityState === "visible";
      if (running) requestAnimationFrame(tick);
    }).observe(canvas);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && FX.on) requestAnimationFrame(tick);
    });
    requestAnimationFrame(tick);
  }

  // scroll-spy project theming (skip while modal open)
  const panels = Array.from(
    document.querySelectorAll(".project-panel[id^='panel-']"),
  );
  if ("IntersectionObserver" in window && panels.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        if (
          !FX.on ||
          document.getElementById("project-modal")?.hidden === false
        )
          return;
        entries.forEach((en) => {
          if (en.isIntersecting) {
            panels.forEach((p) => p.classList.remove("spy-active"));
            en.target.classList.add("spy-active");
            document.body.dataset.project = en.target.id.replace(/^panel-/, "");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    panels.forEach((p) => spy.observe(p));
  }
})();
