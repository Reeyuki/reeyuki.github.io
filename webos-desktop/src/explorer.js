const contextMenu = document.getElementById("context-menu");

export class ExplorerApp {
  constructor(fileSystemManager, windowManager, notepadApp) {
    this.fs = fileSystemManager;
    this.wm = windowManager;
    this.notepadApp = notepadApp;
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
      zIndex: "1000"
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
        const kind = this.fs.getFileKind(this.currentPath, name);
        if (kind === "image") {
          iconImg = this.fs.getFileContent(this.currentPath, name) || "/icons/file.png";
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
            const kind = this.fs.getFileKind(this.currentPath, name);
            if (kind === "image") {
              this.openImageViewer(name, content);
            } else {
              this.notepadApp.open(name, content, this.currentPath);
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
        this.notepadApp.open(itemName, content, this.currentPath);
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
      display: "block"
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
      display: "block"
    });
  }
}
