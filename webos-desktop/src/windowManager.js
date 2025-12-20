export class WindowManager {
  constructor() {
    this.openWindows = new Map();
    this.zIndexCounter = 1000;
  }

  createWindow(id, title, width = "80vw", height = "80vh") {
    const win = document.createElement("div");
    win.className = "window";
    win.id = id;
    win.dataset.fullscreen = "false";

    const vw = width.includes("vw") ? (window.innerWidth * parseFloat(width)) / 100 : parseInt(width);
    const vh = height.includes("vh") ? (window.innerHeight * parseFloat(height)) / 100 : parseInt(height);

    Object.assign(win.style, {
      width: `${vw}px`,
      height: `${vh}px`,
      left: `${(window.innerWidth - vw) / 2}px`,
      top: `${(window.innerHeight - vh) / 2}px`,
      position: "absolute",
      zIndex: this.zIndexCounter++
    });

    return win;
  }

  addToTaskbar(winId, title) {
    if (document.getElementById(`taskbar-${winId}`)) return;

    const taskbarItem = document.createElement("div");
    taskbarItem.id = `taskbar-${winId}`;
    taskbarItem.className = "taskbar-item";
    taskbarItem.textContent = title;

    Object.assign(taskbarItem.style, {
      padding: "8px 15px",
      background: "#2a2a2a",
      color: "white",
      cursor: "pointer",
      borderRadius: "4px",
      marginRight: "5px",
      fontSize: "13px",
      maxWidth: "150px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    });

    taskbarItem.onclick = () => {
      const win = document.getElementById(winId);
      if (win) {
        if (win.style.display === "none") {
          win.style.display = "block";
          taskbarItem.style.background = "#2a2a2a";
        } else {
          this.bringToFront(win);
        }
      }
    };
    const taskbarWindows = document.getElementById("taskbar-windows");
    taskbarWindows.appendChild(taskbarItem);
    this.openWindows.set(winId, { taskbarItem, title });
  }

  removeFromTaskbar(winId) {
    const taskbarItem = document.getElementById(`taskbar-${winId}`);
    if (taskbarItem) taskbarItem.remove();
    this.openWindows.delete(winId);
  }

  bringToFront(win) {
    win.style.zIndex = this.zIndexCounter++;
  }

  minimizeWindow(win) {
    win.style.display = "none";
    const taskbarItem = document.getElementById(`taskbar-${win.id}`);
    if (taskbarItem) taskbarItem.style.background = "#1a1a1a";
  }

  toggleFullscreen(win) {
    const wasFullscreen = win.dataset.fullscreen === "true";

    if (wasFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      win.style.width = win.dataset.prevWidth;
      win.style.height = win.dataset.prevHeight;
      win.style.left = win.dataset.prevLeft;
      win.style.top = win.dataset.prevTop;
      win.dataset.fullscreen = "false";
    } else {
      Object.assign(win.dataset, {
        prevWidth: win.style.width,
        prevHeight: win.style.height,
        prevLeft: win.style.left,
        prevTop: win.style.top
      });

      const makeFullscreen = () => {
        Object.assign(win.style, {
          width: "100vw",
          height: "calc(100vh - 40px)",
          left: "0",
          top: "0"
        });
      };

      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then(makeFullscreen).catch(makeFullscreen);
      } else {
        makeFullscreen();
      }

      win.dataset.fullscreen = "true";
    }
  }

  setupWindowControls(win) {
    win.querySelector(".close-btn").onclick = () => {
      this.removeFromTaskbar(win.id);
      win.remove();
    };
    win.querySelector(".minimize-btn").onclick = () => this.minimizeWindow(win);
    win.querySelector(".maximize-btn").onclick = () => this.toggleFullscreen(win);
    win.addEventListener("mousedown", () => this.bringToFront(win));
  }

  makeDraggable(win) {
    const header = win.querySelector(".window-header");
    header.onmousedown = (e) => {
      if (e.target.tagName === "BUTTON") return;
      const ox = e.clientX - win.offsetLeft;
      const oy = e.clientY - win.offsetTop;
      document.onmousemove = (e) => {
        win.style.left = `${e.clientX - ox}px`;
        win.style.top = `${e.clientY - oy}px`;
      };
      document.onmouseup = () => (document.onmousemove = null);
    };
  }

  makeResizable(win) {
    const resizer = document.createElement("div");
    Object.assign(resizer.style, {
      width: "10px",
      height: "10px",
      background: "transparent",
      position: "absolute",
      right: "0",
      bottom: "0",
      cursor: "se-resize"
    });
    win.appendChild(resizer);

    resizer.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = parseInt(document.defaultView.getComputedStyle(win).width, 10);
      const startHeight = parseInt(document.defaultView.getComputedStyle(win).height, 10);

      const doDrag = (e) => {
        win.style.width = `${startWidth + e.clientX - startX}px`;
        win.style.height = `${startHeight + e.clientY - startY}px`;
      };

      const stopDrag = () => {
        document.documentElement.removeEventListener("mousemove", doDrag);
        document.documentElement.removeEventListener("mouseup", stopDrag);
      };

      document.documentElement.addEventListener("mousemove", doDrag);
      document.documentElement.addEventListener("mouseup", stopDrag);
    });
  }
}
