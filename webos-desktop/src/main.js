import { TerminalApp } from "./terminal.js";
import { ExplorerApp, FileKind } from "./explorer.js";
import { WindowManager } from "./windowManager.js";
import { AppLauncher } from "./appLauncher.js";
import { NotepadApp } from "./notepad.js";
const defaultStorage = {
  home: {
    reeyuki: {
      Documents: {
        "INFO.txt": {
          type: "file",
          content: "Files you saved in notepad gets saved in your browser session.",
          kind: FileKind.TEXT
        }
      },
      Pictures: {
        "wallpaper1.webp": { type: "file", content: "/static/wallpapers/wallpaper1.webp", kind: FileKind.IMAGE },
        "wallpaper2.webp": { type: "file", content: "/static/wallpapers/wallpaper2.webp", kind: FileKind.IMAGE },
        "wallpaper3.webp": { type: "file", content: "/static/wallpapers/wallpaper3.webp", kind: FileKind.IMAGE },
        "wallpaper4.webp": { type: "file", content: "/static/wallpapers/wallpaper4.webp", kind: FileKind.IMAGE },
        "wallpaper5.webp": { type: "file", content: "/static/wallpapers/wallpaper5.webp", kind: FileKind.IMAGE },
        "wallpaper6.webp": { type: "file", content: "/static/wallpapers/wallpaper6.webp", kind: FileKind.IMAGE }
      },
      Music: {}
    }
  }
};
const CONFIG = {
  GRID_SIZE: 80,
  STORAGE_KEY: "desktopOS_fileSystem",
  DEFAULT_WINDOW_SIZE: { width: "80vw", height: "80vh" },
  MUSIC_PLAYLIST: [
    "7pfOV26Wzr1KcV8rtIG2FU",
    "2QGUSa5gqCHjgko63KyQeK",
    "1jDMi92a9zNQuPD3uPMkla",
    "6eTcxkl9G7C2mwejLJ7Amm",
    "1vuSdk2EGjh3eXCXBbT9Qf",
    "3PV4bPPqezu18K45MIOrVY",
    "1K45maA9jDR1kBRpojtPmO",
    "2aEuA8PSqLa17Y4hKPj5rr"
  ]
};

class FileSystemManager {
  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    this.fileSystem = stored ? JSON.parse(stored) : defaultStorage;
  }

  saveToStorage() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.fileSystem));
  }

  normalizePath(path) {
    if (typeof path === "string") {
      return path.split("/").filter((p) => p);
    }
    return Array.isArray(path) ? path.filter((p) => p) : [];
  }

  resolvePath(pathStr, currentPath = []) {
    if (typeof pathStr === "string") {
      if (pathStr.startsWith("/")) {
        return this.normalizePath(pathStr);
      }
      const resolved = [...currentPath];
      pathStr
        .split("/")
        .filter((p) => p)
        .forEach((part) => {
          if (part === "..") {
            resolved.pop();
          } else if (part !== ".") {
            resolved.push(part);
          }
        });
      return resolved;
    }
    return this.normalizePath(pathStr);
  }

  getFolder(path) {
    const normalizedPath = this.normalizePath(path);
    return normalizedPath.reduce((acc, folder) => {
      if (!acc || typeof acc !== "object") {
        throw new Error(`Invalid path: cannot access ${folder}`);
      }
      return acc[folder];
    }, this.fileSystem);
  }

  inferKind(fileName) {
    const ext = fileName.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return FileKind.IMAGE;
    if (["txt", "js", "json", "md", "html", "css"].includes(ext)) return FileKind.TEXT;
    return "generic";
  }

  createFile(path, fileName, content = "") {
    const folder = this.getFolder(path);
    const kind = this.inferKind(fileName);
    folder[fileName] = { type: "file", content, kind };
    this.saveToStorage();
  }

  createFolder(path, folderName) {
    const folder = this.getFolder(path);
    folder[folderName] = {};
    this.saveToStorage();
  }

  deleteItem(path, itemName) {
    const folder = this.getFolder(path);
    delete folder[itemName];
    this.saveToStorage();
  }

  renameItem(path, oldName, newName) {
    const folder = this.getFolder(path);
    folder[newName] = folder[oldName];
    delete folder[oldName];
    this.saveToStorage();
  }

  updateFile(path, fileName, content) {
    const folder = this.getFolder(path);
    const item = folder[fileName];
    if (item && item.type === "file") {
      item.content = content;
    } else {
      const kind = this.inferKind(fileName);
      folder[fileName] = { type: "file", content, kind };
    }
    this.saveToStorage();
  }

  getFileContent(path, fileName) {
    const folder = this.getFolder(path);
    const item = folder[fileName];
    if (item && item.type === "file") {
      return item.content || "";
    }
    return "";
  }

  getFileKind(path, fileName) {
    const folder = this.getFolder(path);
    const item = folder[fileName];
    console.log(item);
    if (item && item.type === "file") {
      return item.kind || "generic";
    }
    return null;
  }

  isFile(path, itemName) {
    const folder = this.getFolder(path);
    const item = folder[itemName];
    return item && item.type === "file";
  }
}

class MusicPlayer {
  constructor() {}
  open(windowManager) {
    if (document.getElementById("music-win")) {
      console.log("bringing window to front");
      windowManager.bringToFront(document.getElementById("music-win"));
      return;
    }
    console.log("Creating window");
    const win = windowManager.createWindow("music-win", "MUSIC");

    win.innerHTML = `
  <div class="window-header">
    <span>MUSIC</span>
    <div class="window-controls">
      <button class="minimize-btn" title="Minimize">−</button>
      <button class="maximize-btn" title="Maximize">□</button>
      <button class="close-btn" title="Close">X</button>
    </div>
  </div>
  <div class="window-content" style="width:100%; height:100%;">
    <div id="player-container" style="display:flex; flex-direction:column; align-items:center; gap:10px; padding:10px;"></div>
    </div>
  </div>`;

    desktop.appendChild(win);
    explorerApp.renderMusicPage(document.getElementById("player-container"));
    windowManager.makeDraggable(win);
    windowManager.makeResizable(win);
    windowManager.setupWindowControls(win);
    windowManager.addToTaskbar(win.id, "MUSIC");
  }
}

class DesktopUI {
  constructor(appLauncher) {
    this.appLauncher = appLauncher;
    this.desktop = document.getElementById("desktop");
    this.startButton = document.getElementById("start-button");
    this.startMenu = document.getElementById("start-menu");
    this.contextMenu = document.getElementById("context-menu");
    this.selectionBox = document.getElementById("selection-box");
    this.setupEventListeners();
  }
  setupEventListeners() {
    this.startButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.startMenu.style.display = this.startMenu.style.display === "flex" ? "none" : "flex";
    });
    this.startMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      this.startMenu.style.display = "none";
      this.contextMenu.style.display = "none";
    });

    this.desktop.addEventListener("contextmenu", (e) => {
      if (e.target === this.desktop) {
        e.preventDefault();
        this.showDesktopContextMenu(e);
      }
    });

    this.setupIconHandlers();
    this.setupSelectionBox();
    this.setupStartMenu();
  }
  setupIconHandlers() {
    document.querySelectorAll(".icon.selectable").forEach((icon) => {
      Object.assign(icon.style, {
        userSelect: "none",
        webkitUserDrag: "none"
      });
      icon.draggable = false;
      icon.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        const app = icon.dataset.app;
        if (app) {
          this.appLauncher.launch(app, icon);
        }
      });

      icon.addEventListener("mousedown", (e) => {
        e.stopPropagation();
      });
    });
  }
  showDesktopContextMenu(e) {
    this.contextMenu.innerHTML = ` <div id="ctx-new-notepad">New Notepad</div>       <div id="ctx-open-explorer">Open File Explorer</div>       <hr>       <div id="ctx-refresh">Refresh</div>       <hr>    ;`;
    document.getElementById("ctx-new-notepad").onclick = () => {
      this.contextMenu.style.display = "none";
      notepadApp.open();
    };

    document.getElementById("ctx-open-explorer").onclick = () => {
      this.contextMenu.style.display = "none";
      explorerApp.open();
    };

    document.getElementById("ctx-refresh").onclick = () => {
      this.contextMenu.style.display = "none";
      location.reload();
    };

    Object.assign(this.contextMenu.style, {
      left: `${e.pageX}px`,
      top: `${e.pageY}px`,
      display: "block"
    });
  }
  setupSelectionBox() {
    const selectableIcons = document.querySelectorAll(".selectable");
    let startX, startY;
    this.desktop.addEventListener("mousedown", (e) => {
      if (e.target !== this.desktop) return;

      startX = e.pageX;
      startY = e.pageY;

      Object.assign(this.selectionBox.style, {
        left: `${startX}px`,
        top: `${startY}px`,
        width: "0px",
        height: "0px",
        display: "block"
      });
      selectableIcons.forEach((icon) => icon.classList.remove("selected"));

      const onMouseMove = (e) => {
        const width = Math.abs(e.pageX - startX);
        const height = Math.abs(e.pageY - startY);
        const left = Math.min(e.pageX, startX);
        const top = Math.min(e.pageY, startY);

        Object.assign(this.selectionBox.style, {
          width: `${width}px`,
          height: `${height}px`,
          left: `${left}px`,
          top: `${top}px`
        });

        const boxRect = this.selectionBox.getBoundingClientRect();
        selectableIcons.forEach((icon) => {
          const iconRect = icon.getBoundingClientRect();
          const isOverlapping = !(
            iconRect.right < boxRect.left ||
            iconRect.left > boxRect.right ||
            iconRect.bottom < boxRect.top ||
            iconRect.top > boxRect.bottom
          );

          if (isOverlapping) {
            icon.classList.add("selected");
          } else {
            icon.classList.remove("selected");
          }
        });
      };

      const onMouseUp = () => {
        this.selectionBox.style.display = "none";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }
  setupStartMenu() {
    this.startMenu.querySelectorAll(".start-item").forEach((item) => {
      item.onclick = (e) => {
        e.stopPropagation();
        const app = item.dataset.app;
        if (app === "documents") {
          explorerApp.open();
          explorerApp.navigate(["home", "reeyuki", "Documents"]);
        } else if (app === "pictures") {
          explorerApp.open();
          explorerApp.navigate(["home", "reeyuki", "Pictures"]);
        } else if (app === "notes") {
          notepadApp.open();
        }

        this.startMenu.style.display = "none";
      };
    });
  }
}

class SystemUtilities {
  static startClock() {
    const updateClock = () => {
      const now = new Date();
      document.getElementById("clock").textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      document.getElementById("date").textContent = now.toLocaleDateString();
    };
    setInterval(updateClock, 1000);
    updateClock();
  }

  static setRandomWallpaper() {
    const pictures = defaultStorage.home.reeyuki.Pictures;

    const wallpapers = Object.values(pictures)
      .filter((item) => item.kind === "image")
      .map((item) => item.content);

    if (!wallpapers.length) return;

    const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];

    document.body.style.background = `url('${randomWallpaper}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
  }
}
const desktop = document.getElementById("desktop");

const fileSystemManager = new FileSystemManager();
const windowManager = new WindowManager();
const notepadApp = new NotepadApp(fileSystemManager, windowManager, null);
const explorerApp = new ExplorerApp(fileSystemManager, windowManager, notepadApp);
notepadApp.setExplorer(explorerApp);
const terminalApp = new TerminalApp(fileSystemManager, windowManager);
const musicPlayer = new MusicPlayer();
const appLauncher = new AppLauncher(
  windowManager,
  fileSystemManager,
  musicPlayer,
  explorerApp,
  terminalApp,
  notepadApp
);
const desktopUI = new DesktopUI(appLauncher);
SystemUtilities.startClock();
SystemUtilities.setRandomWallpaper();
