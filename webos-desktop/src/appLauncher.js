export class AppLauncher {
  constructor(windowManager, fileSystemManager, musicPlayer, explorerApp, terminalApp, notepadApp) {
    this.wm = windowManager;
    this.fs = fileSystemManager;
    this.musicPlayer = musicPlayer;
    this.explorerApp = explorerApp;
    this.terminalApp = terminalApp;
    this.notepadApp = notepadApp;
  }

  launch(app, icon) {
    const appMap = {
      return: { type: "system", action: () => (window.location.href = "/") },
      explorer: { type: "system", action: () => this.explorerApp.open() },
      computer: { type: "system", action: () => this.explorerApp.open() },
      terminal: { type: "system", action: () => this.terminalApp.open() },
      notepad: { type: "system", action: () => this.notepadApp.open() },
      music: { type: "system", action: () => this.musicPlayer.open(this.wm) },
      sonic: {
        type: "swf",
        swf: "https://reeyuki.github.io/static/sonic.swf"
      },
      swarmQueen: {
        type: "swf",
        swf: "https://reeyuki.github.io/static/swarmQueen.swf"
      },
      pacman: { type: "game", url: "https://pacman-e281c.firebaseapp.com" },
      pvz: { type: "game", url: "https://emupedia.net/emupedia-game-pvz" },
      tetris: { type: "game", url: "https://turbowarp.org/embed.html?autoplay#31651654" },
      roads: { type: "game", url: "https://slowroads.io" },
      vscode: { type: "game", url: "https://emupedia.net/emupedia-app-vscode" },
      isaac: { type: "game", url: "https://emupedia.net/emupedia-game-binding-of-isaac" },
      mario: { type: "game", url: "https://emupedia.net/emupedia-game-mario" },
      papaGames: { type: "game", url: "https://papasgamesfree.io" },
      zombieTd: { type: "game", url: "https://www.gamesflow.com/jeux.php?id=2061391" },
      zombotron: { type: "game", url: "https://www.gameflare.com/embed/zombotron" },
      zombotron2: { type: "game", url: "https://www.gameflare.com/embed/zombotron-2" },
      fancyPants: { type: "game", url: "https://www.friv.com/z/games/fancypantsadventure/game.html" },
      fancyPants2: { type: "game", url: "https://www.friv.com/z/games/fancypantsadventure2/game.html" },
      strikeForce: { type: "game", url: "https://www.friv.com/z/games/strikeforcekitty/game.html" },
      jojo: {
        type: "game",
        url: "https://www.retrogames.cc/embed/8843-jojos-bizarre-adventure%3A-heritage-for-the-future-jojo-no-kimyou-na-bouken%3A-mirai-e-no-isan-japan-990927-no-cd.html"
      },
      pokemonRed: { type: "gba", url: "pokemon-red.gba" },
      pokemonEmerald: { type: "gba", url: "pokemon-emerald.gba" },
      pokemonPlatinum: { type: "nds", url: "pokemon-platinum.nds" },
      pokemonHeartgold: { type: "nds", url: "https://files.catbox.moe/xntjzl.nds" },
      pokemonWhite: { type: "nds", url: "https://files.catbox.moe/dcicfh.nds" }
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
      case "gba":
        this.openEmulatorApp(info.url, "gba");
        break;
      case "nds":
        this.openEmulatorApp(info.url, "nds");
        break;
      case "game":
        this.openGameApp(app, info.url);
        break;
    }
  }

  openRuffleApp(swfPath, gameName = "Ruffle Game") {
    const id = swfPath.replace(/[^a-zA-Z0-9]/g, "");
    if (document.getElementById(`${id}-win`)) {
      this.wm.bringToFront(document.getElementById(`${id}-win`));
      return;
    }

    const content = `<embed src="${swfPath}" width="100%" height="100%">`;
    this.createWindow(id, gameName.toUpperCase(), content);
  }

  openEmulatorApp(romName, core) {
    const uniqueId = `${core}-${romName.replace(/\W/g, "")}-${Date.now()}`;

    if (document.getElementById(uniqueId)) {
      this.wm.bringToFront(document.getElementById(uniqueId));
      return;
    }

    const iframeUrl = `/static/emulatorjs.html?rom=${encodeURIComponent(romName)}&core=${encodeURIComponent(core)}&color=%230064ff`;

    const content = `
      <iframe src="${iframeUrl}"
              id="${uniqueId}-iframe"
              style="width:100%; height:100%; border:none;"
              allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
              sandbox="allow-forms allow-downloads allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-autoplay">
      </iframe>
    `;

    const windowTitle = romName.replace(/\..+$/, "");

    this.createWindow(uniqueId, windowTitle, content, iframeUrl);
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

    const formattedName = type.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

    this.createWindow(type, formattedName, content, url);
  }

  createWindow(id, title, contentHtml, externalUrl = null) {
    const win = this.wm.createWindow(`${id}-win`, title);
    win.innerHTML = `
      <div class="window-header">
        <span>${title}</span>
        <div class="window-controls">
          <button class="minimize-btn" title="Minimize">−</button>
          ${externalUrl ? `<button class="external-btn" title="Open in External">↗</button>` : ""}
          <button class="maximize-btn" title="Maximize">□</button>
          <button class="close-btn" title="Close">X</button>
        </div>
      </div>
      <div class="window-content" style="width:100%; height:100%;">
        ${contentHtml}
      </div>
    `;
    desktop.appendChild(win);
    this.wm.makeDraggable(win);
    this.wm.makeResizable(win);
    this.wm.setupWindowControls(win);

    if (externalUrl) {
      win.querySelector(".external-btn").addEventListener("click", () => {
        window.open(externalUrl, "_blank");
      });
    }

    this.wm.addToTaskbar(win.id, title);
  }
}
