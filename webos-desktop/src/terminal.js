export class TerminalApp {
  constructor(fileSystemManager, windowManager) {
    this.fs = fileSystemManager;
    this.wm = windowManager;
    this.currentPath = ["home", "reeyuki"];
    this.history = [];
    this.historyIndex = -1;
    this.username = "reeyuki";
    this.hostname = "desktop-os";
    this.printQueue = Promise.resolve();

    this.commands = {};
    this.registerDefaultCommands();
  }
  async print(text, color = null, isCommand = false, promptText = null, delay = 30) {
    const line = document.createElement("div");
    const span = document.createElement("span");

    if (isCommand) {
      const prompt = document.createElement("span");
      prompt.textContent = promptText || this.terminalPrompt.textContent;
      prompt.style.color = "white";
      line.appendChild(prompt);
      line.appendChild(span);
    } else {
      if (color) span.style.color = color;
      line.appendChild(span);
    }

    this.terminalOutput.appendChild(line);

    for (let i = 0; i < text.length; i++) {
      span.textContent += text[i];
      await new Promise((resolve) => setTimeout(resolve, delay));
      this.terminalOutput.parentElement.scrollTop = this.terminalOutput.parentElement.scrollHeight;
    }
  }

  enqueuePrint(...args) {
    this.printQueue = this.printQueue.then(() => this.print(...args));
    return this.printQueue;
  }

  setupEventHandlers() {
    this.terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const command = this.terminalInput.value.trim();
        if (!command) return;

        this.history.push(command);
        this.historyIndex = this.history.length;

        this.terminalInput.value = "";

        this.executeCommand(command);
      } else if (e.key === "ArrowUp" && this.historyIndex > 0) {
        e.preventDefault();
        this.terminalInput.value = this.history[--this.historyIndex];
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.historyIndex = Math.min(this.historyIndex + 1, this.history.length);
        this.terminalInput.value = this.historyIndex < this.history.length ? this.history[this.historyIndex] : "";
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.handleTabCompletion();
      } else if (e.ctrlKey) {
        if (e.key === "l") {
          e.preventDefault();
          this.cmdClear();
        } else if (e.key === "d") {
          e.preventDefault();
          const win = document.getElementById("terminal-win");
          if (win) {
            this.wm.removeFromTaskbar(win.id);
            win.remove();
          }
        } else if (e.key === "c") {
          e.preventDefault();
          this.enqueuePrint("^C", "white", true, this.terminalPrompt.textContent);
          this.terminalInput.value = "";
        }
      }
    });

    document.getElementById("terminal-win").addEventListener("click", () => {
      this.terminalInput.focus();
    });
  }

  executeCommand(commandStr) {
    this.enqueuePrint(commandStr, null, true, this.terminalPrompt.textContent);

    const [command, ...args] = commandStr.trim().split(/\s+/);

    const commands = {
      help: () => this.cmdHelp(),
      clear: () => this.cmdClear(),
      ls: () => this.cmdLs(args),
      pwd: () => this.enqueuePrint(this.currentPath.length > 0 ? "/" + this.currentPath.join("/") : "/"),
      cd: () => this.cmdCd(args),
      mkdir: () =>
        this.cmdFileOp(
          args,
          "mkdir",
          "missing operand",
          () => this.fs.createFolder(this.currentPath, args[0]),
          "Created directory"
        ),
      touch: () =>
        this.cmdFileOp(
          args,
          "touch",
          "missing file operand",
          () => this.fs.createFile(this.currentPath, args[0], ""),
          "Created file"
        ),
      rm: () =>
        this.cmdFileOp(args, "rm", "missing operand", () => this.fs.deleteItem(this.currentPath, args[0]), "Removed"),
      cat: () => this.cmdCat(args),
      echo: () => this.enqueuePrint(args.join(" ")),
      whoami: () => this.enqueuePrint(this.username),
      hostname: () => this.enqueuePrint(this.hostname),
      date: () => this.enqueuePrint(new Date().toString()),
      history: () => this.history.forEach((cmd, i) => this.enqueuePrint(`  ${i + 1}  ${cmd}`)),
      tree: () => this.cmdTree(),
      uname: () => this.enqueuePrint("Linux reeyuki-desktop 6.1.23-arch1-1 #1 SMP PREEMPT x86_64 GNU/Linux"),
      neofetch: () => this.cmdNeofetch(),
      ping: () => this.cmdPing(args),
      curl: () => this.cmdCurl(args),
      ps: () => this.cmdPs()
    };

    if (commands[command]) commands[command]();
    else if (command) this.enqueuePrint(`bash: ${command}: command not found`);

    this.updatePrompt();
  }

  open() {
    const existingWin = document.getElementById("terminal-win");
    if (existingWin) return this.wm.bringToFront(existingWin);

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
        <div id="terminal-output" style="white-space: pre;"></div>
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
    this.print("Welcome to Reeyuki's silly terminal");
    this.print("Type 'help' for available commands\n");
    this.setupEventHandlers();
  }

  updatePrompt() {
    const path = this.currentPath.length ? "/" + this.currentPath.join("/") : "/";
    this.terminalPrompt.textContent = `${this.username}@${this.hostname}:${path}$ `;
  }

  handleTabCompletion() {
    const input = this.terminalInput.value;
    const cursorPos = this.terminalInput.selectionStart;
    const left = input.slice(0, cursorPos);
    const match = left.match(/(\S+)$/);
    if (!match) return;

    const partial = match[1];
    const leftBeforePartial = left.slice(0, left.length - partial.length);
    let pathParts, baseName;
    if (partial.includes("/")) {
      const parts = partial.split("/");
      baseName = parts.pop();
      pathParts = this.fs.resolvePath(parts.join("/"), this.currentPath);
    } else {
      pathParts = [...this.currentPath];
      baseName = partial;
    }

    let folderContents;
    try {
      folderContents = Object.keys(this.fs.getFolder(pathParts));
    } catch {
      return;
    }
    const matches = folderContents.filter((item) => item.startsWith(baseName));
    if (!matches.length) return;

    if (matches.length === 1) {
      const completion = matches[0] + (this.fs.isFile(pathParts, matches[0]) ? "" : "/");
      this.terminalInput.value = leftBeforePartial + completion + input.slice(cursorPos);
      this.terminalInput.selectionStart = this.terminalInput.selectionEnd =
        leftBeforePartial.length + completion.length;
    } else {
      const commonPrefix = matches.reduce((prefix, item) => {
        let i = 0;
        while (i < prefix.length && i < item.length && prefix[i] === item[i]) i++;
        return prefix.slice(0, i);
      }, matches[0]);
      if (commonPrefix.length > baseName.length) {
        this.terminalInput.value = leftBeforePartial + commonPrefix + input.slice(cursorPos);
        this.terminalInput.selectionStart = this.terminalInput.selectionEnd =
          leftBeforePartial.length + commonPrefix.length;
      } else {
        this.print(matches.join("  "));
      }
    }
  }

  registerCommand(name, handler) {
    this.commands[name] = handler;
  }

  registerFileCommand(name, fsMethod, successMsg, errMsg) {
    this.registerCommand(name, (args) => {
      if (!args.length) return this.print(`${name}: ${errMsg}`);
      try {
        fsMethod(this.currentPath, args[0]);
        this.print(`${successMsg}: ${args[0]}`);
      } catch (e) {
        this.print(`${name}: cannot process '${args[0]}': ${e.message}`);
      }
    });
  }

  registerDefaultCommands() {
    this.registerCommand("help", async () => {
      const cmds = Object.keys(this.commands).sort();
      await this.print("Available commands:");
      for (const c of cmds) await this.print(`  ${c}`);
    });

    this.registerCommand("clear", () => this.cmdClear());
    this.registerCommand("pwd", () => this.print(this.currentPath.length ? "/" + this.currentPath.join("/") : "/"));
    this.registerCommand("ls", (args) => this.cmdLs(args));
    this.registerCommand("cd", (args) => this.cmdCd(args));
    this.registerFileCommand("mkdir", (p, n) => this.fs.createFolder(p, n), "Created directory", "missing operand");
    this.registerFileCommand("touch", (p, n) => this.fs.createFile(p, n, ""), "Created file", "missing file operand");
    this.registerFileCommand("rm", (p, n) => this.fs.deleteItem(p, n), "Removed", "missing operand");

    this.registerCommand("cat", (args) => this.cmdCat(args));
    this.registerCommand("echo", (args) => this.print(args.join(" ")));
    this.registerCommand("whoami", () => this.print(this.username));
    this.registerCommand("hostname", () => this.print(this.hostname));
    this.registerCommand("date", () => this.print(new Date().toString()));
    this.registerCommand("history", () => this.history.forEach((cmd, i) => this.print(`  ${i + 1}  ${cmd}`)));
    this.registerCommand("tree", () => this.cmdTree());
    this.registerCommand("uname", () =>
      this.print("Linux reeyuki-desktop 6.1.23-arch1-1 #1 SMP PREEMPT x86_64 GNU/Linux")
    );

    this.registerCommand("ping", (args) => this.cmdPing(args));
    this.registerCommand("curl", (args) => this.cmdCurl(args));
    this.registerCommand("neofetch", () => this.cmdNeofetch());
    this.registerCommand("ps", () => this.cmdPs());
  }

  cmdClear() {
    this.terminalOutput.innerHTML = "";
  }

  cmdLs(args) {
    try {
      const path = args.length ? this.fs.resolvePath(args[0], this.currentPath) : this.currentPath;
      Object.keys(this.fs.getFolder(path)).forEach((item) => {
        const isFile = this.fs.isFile(path, item);
        this.print(item + (isFile ? "" : "/"), isFile ? null : "blue");
      });
    } catch {
      this.print(`ls: cannot access '${args[0]}': No such file or directory`);
    }
  }

  cmdCd(args) {
    if (!args.length || args[0] === "~") this.currentPath = ["home", this.username];
    else {
      try {
        const newPath = this.fs.resolvePath(args[0], this.currentPath);
        if (!this.fs.getFolder(newPath)) return this.print(`cd: ${args[0]}: Not a directory`);
        this.currentPath = newPath;
      } catch {
        this.print(`cd: ${args[0]}: No such file or directory`);
      }
    }
  }

  cmdCat(args) {
    if (!args.length) return this.print("cat: missing file operand");
    const file = args[0];
    try {
      if (!this.fs.isFile(this.currentPath, file)) return this.print(`cat: ${file}: Is a directory`);
      this.print(this.fs.getFileContent(this.currentPath, file) || "(empty file)");
    } catch {
      this.print(`cat: ${file}: No such file or directory`);
    }
  }

  async cmdPing(args) {
    if (!args.length) return this.print("Usage: ping <host>");
    const host = args[0].startsWith("http") ? args[0] : "https://" + args[0];
    await this.print(`PING ${args[0]} ...`);
    const start = performance.now();
    try {
      await fetch(host, { method: "HEAD", mode: "no-cors" });
    } catch {}
    await this.print(`Reply from ${args[0]}: time=${(performance.now() - start).toFixed(2)}ms`);
  }

  async cmdCurl(args) {
    if (!args.length) return this.print("Usage: curl <url>");
    try {
      const text = await (await fetch(args[0])).text();
      await this.print(text.slice(0, 1000));
    } catch {
      await this.print(`curl: (6) Could not resolve host: ${args[0]}`);
    }
  }

  async cmdNeofetch() {
    const ua = navigator.userAgent;
    const platform = navigator.platform || "Unknown";
    const browser = /Firefox\/\d+/.test(ua)
      ? "Firefox"
      : /Edg\/\d+/.test(ua)
        ? "Edge"
        : /Chrome\/\d+/.test(ua)
          ? "Chrome"
          : "Unknown";
    const cores = navigator.hardwareConcurrency || "Unknown";
    const memoryGB = navigator.deviceMemory || "Unknown";
    let gpu = "Unknown";
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        gpu = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
      }
    } catch {}
    const lines = [
      `       .--.      ${this.username}@${this.hostname}`,
      `     |o_o |     OS: Arch Linux`,
      `     |:_/ |     Browser: ${browser}`,
      `    //   \\ \\   CPU Cores: ${cores}`,
      `   (|     | )  Architecture: ${platform}`,
      `  /'\\_   _/\\'\\ RAM: ${memoryGB} GB`,
      `  \\___)=(___/   GPU: ${gpu}`,
      `                Resolution: ${window.innerWidth}x${window.innerHeight}`,
      `                DE: KDE Plasma`
    ];
    for (const line of lines) await this.print(line, "cyan");
  }

  cmdPs() {
    const windows = Array.from(document.querySelectorAll(".window"));
    this.print("  PID   TTY          TIME CMD");
    if (!windows.length) this.print("  1     pts/0        0:00 idle");
    else
      windows.forEach((win, i) => {
        const cmd = win.querySelector(".window-header span")?.textContent || "unknown";
        this.print(`  ${1000 + i}  pts/0      0:00 ${cmd}`);
      });
  }

  cmdTree(path = this.currentPath, prefix = "") {
    if (!prefix) this.print(path.length ? "/" + path.join("/") : "/");
    try {
      const items = Object.keys(this.fs.getFolder(path));
      items.forEach((item, idx) => {
        const isFile = this.fs.isFile(path, item);
        const isLast = idx === items.length - 1;
        this.print(prefix + (isLast ? "└── " : "├── ") + item + (isFile ? "" : "/"));
        if (!isFile) this.cmdTree([...path, item], prefix + (isLast ? "    " : "│   "));
      });
    } catch {
      this.print(`tree: error reading directory`);
    }
  }
}
