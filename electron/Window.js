const { BrowserWindow } = require("electron");

class Window extends BrowserWindow {
  constructor({ file, width, height }){
    super({ file, width, height });

    this.loadFile(file);

    this.once("ready-to-show", () => {
      this.show();
    });
  }
}

module.exports = Window;
