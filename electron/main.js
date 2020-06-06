const electron = require("electron");
const { app, ipcMain } = require("electron");
const Window = require("./Window");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
  app.quit();
}


const main = () => {
  const display = {
    width: electron.screen.getPrimaryDisplay().workArea.width,
    height: electron.screen.getPrimaryDisplay().workArea.height,
  }

  // Create the browser window.
  const window = new Window({
    file: path.join(__dirname.replace("electron", ""), "src/app.html"),
    icon: path.join(__dirname.replace("electron", ""), "src/assets/icons/label/notepad.ico"),
    width: 800,
    height: 600,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    type: "server"
  });

  window.once("ready-to-show", () => {
    window.show();
  });

  ipcMain.on("window-minimize", () => {
    window.minimize();
  });
  ipcMain.on("window-maximize", () => {
    window.maximize();
  });
  ipcMain.on("window-restore", () => {
    window.restore();
  })
  ipcMain.on("window-close", () => {
    app.quit();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", main);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    main();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and import them here.
