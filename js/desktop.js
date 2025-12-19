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
    "2aEuA8PSqLa17Y4hKPj5rr",
  ],
};

class FileSystemManager {
  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    this.fileSystem = stored
      ? JSON.parse(stored)
      : {
          home: {
            reeyuki: {
              Documents: {},
              Pictures: {
                "wallpaper1.webp": { type: "file", content: "/static/wallpapers/wallpaper1.webp" },
                "wallpaper2.webp": { type: "file", content: "/static/wallpapers/wallpaper2.webp" },
                "wallpaper3.webp": { type: "file", content: "/static/wallpapers/wallpaper3.webp" },
              },
              Music: {},
            },
          },
        };
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

  getFolder(path) {
    const normalizedPath = this.normalizePath(path);
    return normalizedPath.reduce((acc, folder) => {
      if (!acc || typeof acc !== "object") {
        throw new Error(`Invalid path: cannot access ${folder}`);
      }
      return acc[folder];
    }, this.fileSystem);
  }

  createFile(path, fileName, content = "") {
    const folder = this.getFolder(path);
    folder[fileName] = { type: "file", content: content };
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
    if (typeof item === "object" && item.type === "file") {
      item.content = content;
    } else {
      folder[fileName] = { type: "file", content: content };
    }
    this.saveToStorage();
  }

  getFileContent(path, fileName) {
    const folder = this.getFolder(path);
    const item = folder[fileName];
    if (typeof item === "object" && item.type === "file") {
      return item.content || "";
    }
    if (typeof item === "string" && item.startsWith("content:")) {
      return item.replace("content:", "");
    }
    return "";
  }

  isFile(path, itemName) {
    const folder = this.getFolder(path);
    const item = folder[itemName];
    if (typeof item === "object" && item.type === "file") {
      return true;
    }
    return typeof item === "string";
  }
}

class ExplorerApp {
  constructor(fileSystemManager, windowManager) {
    this.fs = fileSystemManager;
    this.wm = windowManager;
    this.currentPath = ["home", "reeyuki"];
    this.fileSelectCallback = null;
  }

  open(callback = null) {
    this.fileSelectCallback = callback;

    if (document.getElementById("explorer-win")) {
      this.wm.bringToFront(document.getElementById("explorer-win"));
      return;
    }

    const win = document.createElement("div");
    win.className = "window";
    win.id = "explorer-win";
    win.dataset.fullscreen = "false";
    Object.assign(win.style, {
      width: "600px",
      left: "100px",
      top: "100px",
      zIndex: "1000",
    });

    win.innerHTML = `
      <div class="window-header">
        <span>File Explorer</span>
        <div class="window-controls">
          <button class="minimize-btn" title="Minimize">−</button>
          <button class="maximize-btn" title="Maximize">□</button>
          <button class="close-btn" title="Close">X</button>
        </div>
      </div>
      <div class="explorer-nav">
        <div class="back-btn" id="exp-back">← Back</div>
        <div id="exp-path" style="color:#555"></div>
      </div>
      <div class="explorer-container">
        <div class="explorer-sidebar">
          <div class="start-item" data-path="home/reeyuki/Documents">Documents</div>
          <div class="start-item" data-path="home/reeyuki/Pictures">Pictures</div>
          <div class="start-item" data-path="home/reeyuki/Music">Music</div>
        </div>
        <div class="explorer-main" id="explorer-view"></div>
      </div>
    `;

    desktop.appendChild(win);
    this.wm.makeDraggable(win);
    this.wm.makeResizable(win);
    this.wm.setupWindowControls(win);
    this.wm.addToTaskbar(win.id, "File Explorer");

    this.setupExplorerControls(win);
    this.render();
  }

  setupExplorerControls(win) {
    win.querySelector("#exp-back").onclick = () => {
      if (this.currentPath.length > 1) {
        this.currentPath.pop();
        this.render();
      }
    };

    win.querySelectorAll(".explorer-sidebar .start-item").forEach((item) => {
      item.onclick = () => {
        const path = item.dataset.path.split("/").filter((p) => p);
        this.navigate(path);
      };
    });

    const explorerView = win.querySelector("#explorer-view");
    explorerView.addEventListener("contextmenu", (e) => {
      if (e.target === explorerView) {
        this.showBackgroundContextMenu(e);
      }
    });
  }

  navigate(newPath) {
    this.currentPath = [...newPath];
    this.render();
  }

  render() {
    const view = document.getElementById("explorer-view");
    const pathDisplay = document.getElementById("exp-path");
    if (!view) return;

    view.innerHTML = "";
    pathDisplay.textContent = "/" + this.currentPath.join("/");

    const folder = this.fs.getFolder(this.currentPath);

    Object.keys(folder).forEach((name) => {
      const isFile = this.fs.isFile(this.currentPath, name);
      const item = document.createElement("div");
      item.className = "file-item";

      let iconImg;

      if (isFile) {
        const ext = name.split(".").pop().toLowerCase();
        if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
          const fileContent = this.fs.getFileContent(this.currentPath, name);
          iconImg = fileContent || "/icons/file.png";
        } else {
          iconImg = "/icons/file.png";
        }
      } else {
        iconImg = "/icons/notepad.png";
      }

      item.innerHTML = `
        <img src="${iconImg}" style="width:64px;height:64px;object-fit:cover">
        <span>${name}</span>
      `;

      item.ondblclick = () => {
        if (isFile) {
          if (this.fileSelectCallback) {
            this.fileSelectCallback(this.currentPath, name);
            this.fileSelectCallback = null;
          } else {
            const content = this.fs.getFileContent(this.currentPath, name);
            const ext = name.split(".").pop().toLowerCase();
            if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
              this.openImageViewer(name, content);
            } else {
              notepadApp.open(name, content, this.currentPath);
            }
          }
        } else {
          this.currentPath.push(name);
          this.render();
        }
      };

      item.oncontextmenu = (e) => this.showFileContextMenu(e, name, isFile);
      view.appendChild(item);
    });
  }

  openImageViewer(name, src) {
    const win = document.createElement("div");
    win.className = "window";
    Object.assign(win.style, { width: "500px", height: "400px", left: "150px", top: "150px", zIndex: 2000 });
    win.innerHTML = `
      <div class="window-header">
        <span>${name}</span>
        <div class="window-controls">
          <button class="close-btn">X</button>
        </div>
      </div>
      <div style="display:flex;justify-content:center;align-items:center;height:calc(100% - 30px);background:#222">
        <img src="${src}" style="max-width:100%; max-height:100%">
      </div>
    `;
    desktop.appendChild(win);
    this.wm.makeDraggable(win);
    win.querySelector(".close-btn").onclick = () => win.remove();
  }

  showFileContextMenu(e, itemName, isFile) {
    e.preventDefault();
    e.stopPropagation();
    contextMenu.innerHTML = "";

    const createMenuItem = (text, onclick) => {
      const item = document.createElement("div");
      item.textContent = text;
      item.onclick = onclick;
      return item;
    };

    const openText = isFile ? "Open" : "Open Folder";
    const openAction = () => {
      contextMenu.style.display = "none";
      if (isFile) {
        const content = this.fs.getFileContent(this.currentPath, itemName);
        notepadApp.open(itemName, content, this.currentPath);
      } else {
        this.currentPath.push(itemName);
        this.render();
      }
    };
    contextMenu.appendChild(createMenuItem(openText, openAction));

    if (isFile) {
      contextMenu.appendChild(document.createElement("hr"));

      const deleteAction = () => {
        contextMenu.style.display = "none";
        this.fs.deleteItem(this.currentPath, itemName);
        this.render();
      };
      contextMenu.appendChild(createMenuItem("Delete", deleteAction));

      const renameAction = () => {
        contextMenu.style.display = "none";
        const newName = prompt("Enter new name:", itemName);
        if (newName && newName !== itemName) {
          this.fs.renameItem(this.currentPath, itemName, newName);
          this.render();
        }
      };
      contextMenu.appendChild(createMenuItem("Rename", renameAction));
    }

    contextMenu.appendChild(document.createElement("hr"));

    const propertiesAction = () => {
      contextMenu.style.display = "none";
      alert(`Name: ${itemName}\nType: ${isFile ? "File" : "Folder"}`);
    };
    contextMenu.appendChild(createMenuItem("Properties", propertiesAction));

    Object.assign(contextMenu.style, {
      left: `${e.pageX}px`,
      top: `${e.pageY}px`,
      display: "block",
    });
  }

  showBackgroundContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    contextMenu.innerHTML = `
      <div id="ctx-new-file">New File</div>
      <div id="ctx-new-folder">New Folder</div>
      <hr>
      <div id="ctx-refresh">Refresh</div>
    `;

    document.getElementById("ctx-new-file").onclick = () => {
      contextMenu.style.display = "none";
      const fileName = prompt("Enter file name:", "NewFile.txt");
      if (fileName) {
        this.fs.createFile(this.currentPath, fileName);
        this.render();
      }
    };

    document.getElementById("ctx-new-folder").onclick = () => {
      contextMenu.style.display = "none";
      const folderName = prompt("Enter folder name:", "NewFolder");
      if (folderName) {
        this.fs.createFolder(this.currentPath, folderName);
        this.render();
      }
    };

    document.getElementById("ctx-refresh").onclick = () => {
      contextMenu.style.display = "none";
      this.render();
    };

    Object.assign(contextMenu.style, {
      left: `${e.pageX}px`,
      top: `${e.pageY}px`,
      display: "block",
    });
  }
}

class TerminalApp {
  constructor(fileSystemManager, windowManager) {
    this.fs = fileSystemManager;
    this.wm = windowManager;
    this.currentPath = ["home", "reeyuki"];
    this.history = [];
    this.historyIndex = -1;
    this.username = "reeyuki";
    this.hostname = "desktop-os";
  }

  open() {
    if (document.getElementById("terminal-win")) {
      this.wm.bringToFront(document.getElementById("terminal-win"));
      return;
    }

    const win = this.wm.createWindow("terminal-win", "Terminal", "700px", "500px");
    Object.assign(win.style, { left: "200px", top: "100px" });

    win.innerHTML = `
      <div class="window-header">
        <span>Terminal</span>
        <div class="window-controls">
          <button class="minimize-btn" title="Minimize">−</button>
          <button class="maximize-btn" title="Maximize">□</button>
          <button class="close-btn" title="Close">X</button>
        </div>
      </div>
      <div class="window-content" style="background:#000; color:white; font-family:monospace; padding:10px; overflow-y:auto; height:calc(100% - 40px);">
        <div id="terminal-output"></div>
        <div id="terminal-input-line" style="display:flex;">
          <span id="terminal-prompt"></span>
          <input type="text" id="terminal-input" style="flex:1; background:transparent; border:none; color:white; font-family:monospace; outline:none; margin-left:5px;" autocomplete="off">
        </div>
      </div>
    `;

    desktop.appendChild(win);
    this.wm.makeDraggable(win);
    this.wm.makeResizable(win);
    this.wm.setupWindowControls(win);
    this.wm.addToTaskbar(win.id, "Terminal");

    this.terminalOutput = win.querySelector("#terminal-output");
    this.terminalInput = win.querySelector("#terminal-input");
    this.terminalPrompt = win.querySelector("#terminal-prompt");

    this.updatePrompt();
    this.terminalInput.focus();
    this.printWelcome();
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const command = this.terminalInput.value.trim();
        if (command) {
          this.history.push(command);
          this.historyIndex = this.history.length;
          this.executeCommand(command);
        }
        this.terminalInput.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.terminalInput.value = this.history[this.historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.terminalInput.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.terminalInput.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.handleTabCompletion();
      } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        this.cmdClear();
      } else if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        const win = document.getElementById("terminal-win");
        if (win) {
          this.wm.removeFromTaskbar(win.id);
          win.remove();
        }
      } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        const promptText = this.terminalPrompt.textContent;
        const currentInput = this.terminalInput.value;
        this.print("^C", "white", true, promptText);
        this.terminalInput.value = "";
      }
    });

    document.getElementById("terminal-win").addEventListener("click", () => {
      this.terminalInput.focus();
    });
  }

  printWelcome() {
    this.print("Welcome to Reeyuki's silly terminal");
    this.print("Type 'help' for available commands");
    this.print("");
  }

  updatePrompt() {
    const path = this.currentPath.length > 0 ? "/" + this.currentPath.join("/") : "/";
    this.terminalPrompt.textContent = `${this.username}@${this.hostname}:${path}$ `;
  }

  print(text, color = null, isCommand = false, promptText = null) {
    const line = document.createElement("div");

    if (isCommand) {
      const prompt = document.createElement("span");
      prompt.textContent = promptText || this.terminalPrompt.textContent;
      prompt.style.color = "white";
      line.appendChild(prompt);

      const cmd = document.createElement("span");
      cmd.textContent = text;
      line.appendChild(cmd);
    } else {
      if (color) {
        const span = document.createElement("span");
        span.style.color = color;
        span.textContent = text;
        line.appendChild(span);
      } else {
        line.textContent = text;
      }
    }

    this.terminalOutput.appendChild(line);
    this.terminalOutput.parentElement.scrollTop = this.terminalOutput.parentElement.scrollHeight;
  }
  handleTabCompletion() {
    const input = this.terminalInput.value;
    const cursorPos = this.terminalInput.selectionStart;

    const left = input.slice(0, cursorPos);
    const right = input.slice(cursorPos);

    const match = left.match(/(\S+)$/);
    if (!match) return;

    const partial = match[1];
    const leftBeforePartial = left.slice(0, left.length - partial.length);

    let pathParts, baseName;
    if (partial.includes("/")) {
      const parts = partial.split("/");
      baseName = parts.pop();
      pathParts = this.resolvePath(parts.join("/"));
    } else {
      pathParts = [...this.currentPath];
      baseName = partial;
    }

    let folderContents;
    try {
      const folder = this.fs.getFolder(pathParts);
      folderContents = Object.keys(folder);
    } catch {
      return;
    }

    const matches = folderContents.filter((item) => item.startsWith(baseName));

    if (matches.length === 0) return;
    if (matches.length === 1) {
      const completion = matches[0] + (this.fs.isFile(pathParts, matches[0]) ? "" : "/");
      this.terminalInput.value = leftBeforePartial + completion + right;
      this.terminalInput.selectionStart = this.terminalInput.selectionEnd =
        leftBeforePartial.length + completion.length;
    } else {
      const commonPrefix = matches.reduce((prefix, item) => {
        let i = 0;
        while (i < prefix.length && i < item.length && prefix[i] === item[i]) i++;
        return prefix.slice(0, i);
      }, matches[0]);

      if (commonPrefix.length > baseName.length) {
        this.terminalInput.value = leftBeforePartial + commonPrefix + right;
        this.terminalInput.selectionStart = this.terminalInput.selectionEnd =
          leftBeforePartial.length + commonPrefix.length;
      } else {
        this.print(matches.join("  "));
      }
    }
  }

  cmdUname() {
    this.print("Linux reeyuki-desktop 6.1.23-arch1-1 #1 SMP PREEMPT x86_64 GNU/Linux");
  }

  cmdNeofetch() {
    const browserInfo = (() => {
      const ua = navigator.userAgent;
      if (/Firefox\/\d+/.test(ua)) return "Firefox";
      if (/Chrome\/\d+/.test(ua) && !/Edg\/\d+/.test(ua)) return "Chrome";
      if (/Edg\/\d+/.test(ua)) return "Edge";
      if (/Safari\/\d+/.test(ua) && !/Chrome\/\d+/.test(ua)) return "Safari";
      return "Unknown Browser";
    })();

    const cpuArch = navigator.platform || "Unknown";

    const resolution = `${window.innerWidth}x${window.innerHeight}`;

    const lines = [
      `       .--.      ${this.username}@${this.hostname}`,
      `     |o_o |     OS: Web Browser`,
      `     |:_/ |     Browser: ${browserInfo}`,
      `    //   \\ \\    `,
      `   (|     | )   Architecture: ${cpuArch}`,
      `  /'\\_   _/\\'\\  Resolution: ${resolution}`,
      `  \\___)=(___/   DE: Web Desktop OS`,
      `               `,
    ];

    lines.forEach((line) => this.print(line, "cyan"));
  }

  async cmdPing(args) {
    if (!args[0]) {
      this.print("Usage: ping <host>");
      return;
    }

    let host = args[0];
    if (!host.startsWith("http://") && !host.startsWith("https://")) {
      host = "https://" + host;
    }

    this.print(`PING ${args[0]} ...`);
    const start = performance.now();

    try {
      await fetch(host, { method: "HEAD", mode: "no-cors" });
      const end = performance.now();
      const time = (end - start).toFixed(2);
      this.print(`Reply from ${args[0]}: time=${time}ms`);
    } catch {
      this.print(`Ping request to ${args[0]} failed`);
    }
  }

  async cmdCurl(args) {
    if (!args[0]) {
      this.print("Usage: curl <url>");
      return;
    }

    const url = args[0];
    try {
      const res = await fetch(url);
      const text = await res.text();
      this.print(text.slice(0, 1000));
    } catch {
      this.print(`curl: (6) Could not resolve host: ${url}`);
    }
  }

  cmdDate() {
    this.print(new Date().toString());
  }

  cmdPs() {
    const windows = Array.from(document.querySelectorAll(".window"));
    if (windows.length === 0) {
      this.print("  PID   TTY          TIME CMD");
      this.print("  1     pts/0        0:00 idle");
      return;
    }
    this.print("  PID   TTY          TIME CMD");
    windows.forEach((win, i) => {
      const cmd = win.querySelector(".window-header span")?.textContent || "unknown";
      this.print(`  ${1000 + i}  pts/0      0:00 ${cmd}`);
    });
  }

  executeCommand(commandStr) {
    const promptText = this.terminalPrompt.textContent;
    this.print(commandStr, null, true, promptText);

    const parts = commandStr.trim().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    const commands = {
      help: () => this.cmdHelp(),
      clear: () => this.cmdClear(),
      ls: () => this.cmdLs(args),
      pwd: () => this.cmdPwd(),
      cd: () => this.cmdCd(args),
      mkdir: () => this.cmdMkdir(args),
      touch: () => this.cmdTouch(args),
      rm: () => this.cmdRm(args),
      cat: () => this.cmdCat(args),
      echo: () => this.cmdEcho(args),
      whoami: () => this.cmdWhoami(),
      hostname: () => this.cmdHostname(),
      date: () => this.cmdDate(),
      history: () => this.cmdHistory(),
      tree: () => this.cmdTree(),
      uname: () => this.cmdUname(),
      neofetch: () => this.cmdNeofetch(),
      ping: () => this.cmdPing(args),
      curl: () => this.cmdCurl(args),
      ps: () => this.cmdPs(),
    };

    if (commands[command]) {
      commands[command]();
    } else if (command) {
      this.print(`bash: ${command}: command not found`);
    }

    this.updatePrompt();
  }

  cmdHelp() {
    this.print("Available commands:");
    this.print("  help      - Show this help message");
    this.print("  clear     - Clear the terminal screen");
    this.print("  ls        - List directory contents");
    this.print("  pwd       - Print working directory");
    this.print("  cd [dir]  - Change directory");
    this.print("  mkdir     - Create a new directory");
    this.print("  touch     - Create a new file");
    this.print("  rm        - Remove file or directory");
    this.print("  cat       - Display file contents");
    this.print("  echo      - Display a line of text");
    this.print("  whoami    - Display current user");
    this.print("  hostname  - Display hostname");
    this.print("  date      - Display current date and time");
    this.print("  history   - Show command history");
    this.print("  tree      - Display directory tree");
  }

  cmdClear() {
    this.terminalOutput.innerHTML = "";
  }

  cmdLs(args) {
    try {
      const path = args.length > 0 ? this.resolvePath(args[0]) : this.currentPath;
      const folder = this.fs.getFolder(path);
      const items = Object.keys(folder);

      if (items.length === 0) return;

      const dirs = [];
      const files = [];

      items.forEach((item) => {
        if (this.fs.isFile(path, item)) files.push(item);
        else dirs.push(item);
      });

      dirs.forEach((dir) => this.print(dir + "/", "blue"));
      files.forEach((file) => this.print(file));
    } catch (error) {
      this.print(`ls: cannot access '${args[0]}': No such file or directory`);
    }
  }

  cmdPwd() {
    const path = this.currentPath.length > 0 ? "/" + this.currentPath.join("/") : "/";
    this.print(path);
  }

  cmdCd(args) {
    if (args.length === 0) {
      this.currentPath = ["home", this.username];
      return;
    }

    const target = args[0];

    if (target === "..") {
      if (this.currentPath.length > 0) {
        this.currentPath.pop();
      }
      return;
    }

    if (target === "/") {
      this.currentPath = [];
      return;
    }

    if (target === "~") {
      this.currentPath = ["home", this.username];
      return;
    }

    try {
      const newPath = this.resolvePath(target);
      const folder = this.fs.getFolder(newPath);

      if (typeof folder !== "object" || folder === null) {
        this.print(`cd: ${target}: Not a directory`);
        return;
      }

      this.currentPath = newPath;
    } catch (error) {
      this.print(`cd: ${target}: No such file or directory`);
    }
  }

  cmdMkdir(args) {
    if (args.length === 0) {
      this.print("mkdir: missing operand");
      return;
    }

    try {
      this.fs.createFolder(this.currentPath, args[0]);
      this.print(`Created directory: ${args[0]}`);
    } catch (error) {
      this.print(`mkdir: cannot create directory '${args[0]}': ${error.message}`);
    }
  }

  cmdTouch(args) {
    if (args.length === 0) {
      this.print("touch: missing file operand");
      return;
    }

    try {
      this.fs.createFile(this.currentPath, args[0], "");
      this.print(`Created file: ${args[0]}`);
    } catch (error) {
      this.print(`touch: cannot create file '${args[0]}': ${error.message}`);
    }
  }

  cmdRm(args) {
    if (args.length === 0) {
      this.print("rm: missing operand");
      return;
    }

    try {
      this.fs.deleteItem(this.currentPath, args[0]);
      this.print(`Removed: ${args[0]}`);
    } catch (error) {
      this.print(`rm: cannot remove '${args[0]}': ${error.message}`);
    }
  }

  cmdCat(args) {
    if (args.length === 0) {
      this.print("cat: missing file operand");
      return;
    }

    try {
      const fileName = args[0];
      if (!this.fs.isFile(this.currentPath, fileName)) {
        this.print(`cat: ${fileName}: Is a directory`);
        return;
      }

      const content = this.fs.getFileContent(this.currentPath, fileName);
      this.print(content || "(empty file)");
    } catch (error) {
      this.print(`cat: ${args[0]}: No such file or directory`);
    }
  }

  cmdEcho(args) {
    this.print(args.join(" "));
  }

  cmdWhoami() {
    this.print(this.username);
  }

  cmdHostname() {
    this.print(this.hostname);
  }

  cmdDate() {
    this.print(new Date().toString());
  }

  cmdHistory() {
    this.history.forEach((cmd, index) => {
      this.print(`  ${index + 1}  ${cmd}`);
    });
  }

  cmdTree(path = this.currentPath, prefix = "", isLast = true) {
    if (prefix === "") {
      const currentPathStr = path.length > 0 ? "/" + path.join("/") : "/";
      this.print(currentPathStr);
    }

    try {
      const folder = this.fs.getFolder(path);
      const items = Object.keys(folder);

      items.forEach((item, index) => {
        const isLastItem = index === items.length - 1;
        const connector = isLastItem ? "└── " : "├── ";
        const isFile = this.fs.isFile(path, item);

        this.print(prefix + connector + item + (isFile ? "" : "/"));

        if (!isFile) {
          const newPrefix = prefix + (isLastItem ? "    " : "│   ");
          this.cmdTree([...path, item], newPrefix, isLastItem);
        }
      });
    } catch (error) {
      this.print(`tree: error reading directory`);
    }
  }

  resolvePath(pathStr) {
    if (pathStr.startsWith("/")) {
      return pathStr.split("/").filter((p) => p);
    }

    const parts = pathStr.split("/").filter((p) => p);
    const resolved = [...this.currentPath];

    parts.forEach((part) => {
      if (part === "..") {
        resolved.pop();
      } else if (part !== ".") {
        resolved.push(part);
      }
    });

    return resolved;
  }
}

class WindowManager {
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
      zIndex: this.zIndexCounter++,
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
      whiteSpace: "nowrap",
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

    taskbarWindows.appendChild(taskbarItem);
    this.openWindows.set(winId, { taskbarItem, title });
  }

  removeFromTaskbar(winId) {
    const taskbarItem = document.getElementById(`taskbar-${winId}`);
    if (taskbarItem) taskbarItem.remove();
    this.openWindows.delete(winId);
  }

  bringToFront(win) {
    document.querySelectorAll(".window").forEach((w) => {
      w.style.zIndex = "10";
    });
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
        prevTop: win.style.top,
      });

      const makeFullscreen = () => {
        Object.assign(win.style, {
          width: "100vw",
          height: "calc(100vh - 40px)",
          left: "0",
          top: "0",
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
      cursor: "se-resize",
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

class NotepadApp {
  constructor(fileSystemManager, windowManager) {
    this.fs = fileSystemManager;
    this.wm = windowManager;
  }

  open(title = "Untitled", content = "", filePath = null) {
    const winId = `notepad-${title.replace(/\s/g, "")}`;
    if (document.getElementById(winId)) {
      this.wm.bringToFront(document.getElementById(winId));
      return;
    }

    const win = this.wm.createWindow(winId, `${title} - Notepad`, "600px", "400px");
    Object.assign(win.style, { left: "250px", top: "150px" });

    win.innerHTML = `
      <div class="window-header">
        <span>${title} - Notepad</span>
        <div class="window-controls">
          <button class="minimize-btn" title="Minimize">−</button>
          <button class="maximize-btn" title="Maximize">□</button>
          <button class="close-btn" title="Close">X</button>
        </div>
      </div>
      <div class="notepad-menu">
        <button class="notepad-btn" data-action="save">Save</button>
        <button class="notepad-btn" data-action="saveAs">Save As</button>
        <button class="notepad-btn" data-action="open">Open</button>
      </div>
      <div class="window-content">
        <textarea class="notepad-textarea" style="width:100%; height:calc(100% - 40px); border:none; padding:10px; font-family:monospace;">${content}</textarea>
      </div>
    `;

    desktop.appendChild(win);
    this.wm.makeDraggable(win);
    this.wm.makeResizable(win);
    this.wm.setupWindowControls(win);
    this.wm.addToTaskbar(win.id, `${title} - Notepad`);

    this.setupNotepadControls(win, title, filePath);
  }

  setupNotepadControls(win, currentTitle, currentPath) {
    const textarea = win.querySelector(".notepad-textarea");
    const buttons = win.querySelectorAll(".notepad-btn");

    buttons.forEach((btn) => {
      btn.onclick = () => {
        const action = btn.dataset.action;

        if (action === "save") {
          this.saveFile(win, textarea, currentTitle, currentPath);
        } else if (action === "saveAs") {
          this.saveAsFile(textarea);
        } else if (action === "open") {
          this.openFileDialog();
        }
      };
    });
  }

  saveFile(win, textarea, title, path) {
    if (!path) {
      this.saveAsFile(textarea);
      return;
    }

    const content = textarea.value;
    this.fs.updateFile(path, title, content);
    alert(`File saved: ${title}`);
  }

  saveAsFile(textarea) {
    const fileName = prompt("Enter file name:", "NewFile.txt");
    if (!fileName) return;

    const pathString = prompt("Enter path (e.g., home/reeyuki/Documents):", "home/reeyuki/Documents");
    if (!pathString) return;

    const path = pathString.split("/").filter((p) => p);
    const content = textarea.value;

    try {
      this.fs.createFile(path, fileName, content);
      alert(`File saved: ${fileName} at /${pathString}`);
    } catch (error) {
      alert("Error saving file. Please check the path.");
    }
  }

  openFileDialog() {
    explorerApp.open((path, fileName) => {
      const content = this.fs.getFileContent(path, fileName);
      this.open(fileName, content, path);
    });
  }
}
class MusicPlayer {
  constructor() {
    this.currentTrackIndex = 0;
  }

  open(windowManager) {
    if (document.getElementById("music-win")) {
      windowManager.bringToFront(document.getElementById("music-win"));
      return;
    }

    const win = windowManager.createWindow("music-win", "MUSIC");
    const initialTrackId = CONFIG.MUSIC_PLAYLIST[this.currentTrackIndex];

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
        <div class="player-container" style="display:flex; flex-direction:column; align-items:center; gap:10px; padding:10px;">
          <iframe id="player-frame" 
                  src="https://open.spotify.com/embed/track/${initialTrackId}?utm_source=generator" 
                  style="width:100%; height:100%; border:none;" 
                  allow="autoplay; encrypted-media"></iframe>
          <div class="player-controls" style="display:flex; align-items:center; gap:15px; background:#282828; padding:8px 15px; border-radius:20px; color:white;">
            <button id="music-prev" style="background:none; border:none; color:white; cursor:pointer; font-size:18px;">⏮</button>
            <span id="music-status" style="font-family:monospace; font-size:12px; min-width:80px; text-align:center;">Track ${
              this.currentTrackIndex + 1
            } / ${CONFIG.MUSIC_PLAYLIST.length}</span>
            <button id="music-next" style="background:none; border:none; color:white; cursor:pointer; font-size:18px;">⏭</button>
          </div>
        </div>
      </div>`;

    desktop.appendChild(win);
    windowManager.makeDraggable(win);
    windowManager.makeResizable(win);
    windowManager.setupWindowControls(win);
    windowManager.addToTaskbar(win.id, "MUSIC");

    this.setupControls(win);
  }

  setupControls(win) {
    const frame = win.querySelector("#player-frame");
    const status = win.querySelector("#music-status");

    win.querySelector("#music-next").onclick = () => {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % CONFIG.MUSIC_PLAYLIST.length;
      this.updateUI(frame, status);
    };

    win.querySelector("#music-prev").onclick = () => {
      this.currentTrackIndex =
        (this.currentTrackIndex - 1 + CONFIG.MUSIC_PLAYLIST.length) % CONFIG.MUSIC_PLAYLIST.length;
      this.updateUI(frame, status);
    };
  }

  updateUI(frame, status) {
    const trackId = CONFIG.MUSIC_PLAYLIST[this.currentTrackIndex];
    frame.src = "";
    frame.src = `https://open.spotify.com/embed/track/${trackId}`;
    status.innerText = `Track ${this.currentTrackIndex + 1} / ${CONFIG.MUSIC_PLAYLIST.length}`;
  }
}

class DesktopOS {
  constructor() {
    this.fs = new FileSystemManager();
    this.wm = new WindowManager();
    this.hasDownloadedRuffle = false;
    this.musicPlayer = new MusicPlayer();

    this.initializeDOM();
    this.setupEventListeners();
    this.startClock();
  }

  initializeDOM() {
    this.desktop = document.getElementById("desktop");
    this.startButton = document.getElementById("start-button");
    this.startMenu = document.getElementById("start-menu");
    this.contextMenu = document.getElementById("context-menu");
    this.selectionBox = document.getElementById("selection-box");
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
        webkitUserDrag: "none",
      });
      icon.draggable = false;

      icon.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        this.handleIconAction(icon);
      });

      icon.addEventListener("mousedown", (e) => {
        e.stopPropagation();
      });
    });
  }
  handleIconAction(icon) {
    const app = icon.dataset.app;
    if (!app) return;

    const appMap = {
      return: { type: "system", action: () => (window.location.href = "/") },
      explorer: { type: "system", action: () => explorerApp.open() },
      computer: { type: "system", action: () => explorerApp.open() },
      terminal: { type: "system", action: () => terminalApp.open() },
      notepad: { type: "system", action: () => notepadApp.open() },
      music: { type: "system", action: () => this.musicPlayer.open(this.wm) },
      sonic: { type: "swf", swf: "sonic.swf" },
      swarmQueen: { type: "swf", swf: "swarmQueen.swf" },
      pacman: { type: "game", url: "https://pacman-e281c.firebaseapp.com" },
      pvz: { type: "game", url: "https://emupedia.net/emupedia-game-pvz" },
      tetris: { type: "game", url: "https://turbowarp.org/embed.html?autoplay#31651654" },
      roads: { type: "game", url: "https://slowroads.io" },
      vscode: { type: "game", url: "https://emupedia.net/emupedia-app-vscode" },
      starcraft: { type: "game", url: "https://retroonline.net/Windows/StarCraft:%20Brood%20War" },
      isaac: { type: "game", url: "https://emupedia.net/emupedia-game-binding-of-isaac" },
      mario: { type: "game", url: "https://emupedia.net/emupedia-game-mario" },
      papaGames: { type: "game", url: "https://papasgamesfree.io" },
      zombotron: { type: "game", url: "https://www.friv.com/z/games/zombotron/game.html" },
      zombotron2: { type: "game", url: "https://www.friv.com/z/games/zombotron2/game.html" },
      zombieTd: { type: "game", url: "https://www.gamesflow.com/jeux.php?id=2061391" },
      fancyPants: { type: "game", url: "https://www.friv.com/z/games/fancypantsadventure/game.html" },
      fancyPants2: { type: "game", url: "https://www.friv.com/z/games/fancypantsadventure2/game.html" },
    };

    const info = appMap[app];
    if (!info) return;

    switch (info.type) {
      case "system":
        info.action();
        break;
      case "swf":
        this.openRuffleApp(info.swf);
        break;
      case "game":
        this.openGameApp(app, info.url);
        break;
    }
  }
  async openRuffleApp(swfPath, gameName = "Ruffle Game") {
    const id = swfPath.replace(".swf", "");
    if (document.getElementById(`${id}-win`)) {
      this.wm.bringToFront(document.getElementById(`${id}-win`));
      return;
    }

    const content = `<embed src="/static/${swfPath}" width="100%" height="100%">`;
    this.createWindow(id, gameName.toUpperCase(), content);
  }

  openGameApp(type, url) {
    if (document.getElementById(`${type}-win`)) {
      this.wm.bringToFront(document.getElementById(`${type}-win`));
      return;
    }

    const content = `
      <iframe src="${url}" 
              style="width:100%; height:100%; border:none;" 
              allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
              sandbox="allow-forms allow-downloads allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-autoplay"></iframe>
    `;

    this.createWindow(type, type.toUpperCase(), content);
  }

  createWindow(id, title, contentHtml) {
    const win = this.wm.createWindow(`${id}-win`, title);
    win.innerHTML = `
      <div class="window-header">
        <span>${title}</span>
        <div class="window-controls">
          <button class="minimize-btn" title="Minimize">−</button>
          <button class="maximize-btn" title="Maximize">□</button>
          <button class="close-btn" title="Close">X</button>
        </div>
      </div>
      <div class="window-content" style="width:100%; height:100%;">
        ${contentHtml}
      </div>
    `;
    this.desktop.appendChild(win);
    this.wm.makeDraggable(win);
    this.wm.makeResizable(win);
    this.wm.setupWindowControls(win);
    this.wm.addToTaskbar(win.id, title);
  }

  showDesktopContextMenu(e) {
    this.contextMenu.innerHTML = `
      <div id="ctx-new-notepad">New Notepad</div>
      <div id="ctx-open-explorer">Open File Explorer</div>
      <hr>
      <div id="ctx-refresh">Refresh</div>
      <hr>
    `;

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
      display: "block",
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
        display: "block",
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
          top: `${top}px`,
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
  startClock() {
    const updateClock = () => {
      const now = new Date();
      document.getElementById("clock").textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      document.getElementById("date").textContent = now.toLocaleDateString();
    };
    setInterval(updateClock, 1000);
    updateClock();
  }
}
const desktop = document.getElementById("desktop");
const taskbarWindows = document.getElementById("taskbar-windows");
const contextMenu = document.getElementById("context-menu");
const fileSystemManager = new FileSystemManager();
const windowManager = new WindowManager();
const notepadApp = new NotepadApp(fileSystemManager, windowManager);
const explorerApp = new ExplorerApp(fileSystemManager, windowManager);
const terminalApp = new TerminalApp(fileSystemManager, windowManager);
const desktopOS = new DesktopOS();

const wallpapers = [
  "/static/wallpapers/wallpaper1.webp",
  "/static/wallpapers/wallpaper2.webp",
  "/static/wallpapers/wallpaper3.webp",
];

const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];

document.body.style.background = `url('${randomWallpaper}') no-repeat center center fixed`;
document.body.style.backgroundSize = "cover";
