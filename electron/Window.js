const { BrowserWindow } = require("electron");

class Window extends BrowserWindow {
  constructor({ file, ...windowSettings }){
    super({ ...windowSettings });

    this.loadFile(file);

    this.once("ready-to-show", () => {
      this.show();
    });
  }
}

module.exports = Window;
