const ipcRenderer = require("electron").ipcRenderer;
const fs = require("fs");

export default class AppMenu {
  constructor(){
    this.controls = {
      minimize: { el: document.querySelector("#controlMinimize"), sendMessage: "window-minimize" },
      maximize: { el: document.querySelector("#controlMaximize"), sendMessage: "window-maximize" },
      restore: { el: document.querySelector("#controlRestore"), sendMessage: "window-restore" },
      close: { el: document.querySelector("#controlClose"), sendMessage: "window-close" }
    };
    this.initControls();
  }
  initControls(){
    for(let prop in this.controls){
      let controls = this.controls[prop];
      controls.el.addEventListener("click", () => {
        ipcRenderer.send(this.controls[prop].sendMessage);
      });
    }

    // при клике на кнопку "maximize"
    this.controls.maximize.el.addEventListener("click", () => {
      let maximizeBtn = this.controls.maximize.el;
      let restoreBtn = this.controls.restore.el;

      maximizeBtn.style.display = "none";
      restoreBtn.style.display = "flex";
    });

    // при клике на кнопку "restore"
    this.controls.restore.el.addEventListener("click", () => {
      let restoreBtn = this.controls.restore.el;
      let maximizeBtn = this.controls.maximize.el;

      restoreBtn.style.display = "none";
      maximizeBtn.style.display = "flex";
    });
  }
}
