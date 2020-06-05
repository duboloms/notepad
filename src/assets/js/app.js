const ipcRenderer = require('electron').ipcRenderer;

document.querySelector("#controlClose").addEventListener("click", () => {
  ipcRenderer.send("close-window");
});

document.querySelector("#controlMin").addEventListener("click", () => {
  ipcRenderer.send("minimize-window");
});

document.querySelector("#controlMax").addEventListener("click", () => {
  ipcRenderer.send("maximize-window");
});
