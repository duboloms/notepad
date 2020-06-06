const { BrowserWindow } = require("electron");

class Window extends BrowserWindow {
  constructor({ file, type, ...windowSettings }){
    super({ ...windowSettings });

    if(type === "default") {
      this.loadFile(file);
    } else if(type === "server") {
      this.loadURL("http://localhost:5000/src/app.html");
    }

    this.once("ready-to-show", () => {
      this.show();
    });
  }
}

module.exports = Window;
