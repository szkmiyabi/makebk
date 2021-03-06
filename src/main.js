const { app, Menu, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");

let mainWindow;

const rmenu = Menu.buildFromTemplate([
    {
        label: "切り取り",
        role: "cut"        
    },
    {
        label: "コピー",
        role: "copy"
    },
    {
        label: "貼り付け",
        role: "paste"
    },
    {
        label: "全て選択",
        role: "selectall"
    },
    {
        type: "separator"
    },
    {
        label: "DevToolを開く",
        click: () => {
            let crWindow = BrowserWindow.getFocusedWindow();
            crWindow.webContents.toggleDevTools();
        }
    },
]);

function createWindow() {
    mainWindow = new BrowserWindow({ width: 1140, height: 870});
    mainWindow.loadURL("file://" + __dirname + "/index.html");
    //mainWindow.webContents.toggleDevTools();
    Menu.setApplicationMenu(null);
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", () => {
    createWindow();

});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if(mainWindow === null) {
        createWindow();
    }
});

app.on("browser-window-created", (event, win) => {
    win.webContents.on("context-menu", (e, params) => {
        rmenu.popup(win, params.x, params.y);
    });
});