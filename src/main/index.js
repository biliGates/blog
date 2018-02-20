'use strict'

import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /* 窗口配置 */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    minWidth: 1000,
    minHeight: 650,
    height: 650,
    width: 1000,
    backgroundColor: '#f1f1f1',
    frame: false
  })

  mainWindow.loadURL(winURL)
  // 主进程通信处理函数  -----------------
  ipcMain.on('window-close', () => {
    mainWindow.close()
  })

  ipcMain.on('window-maximize', () => {
    mainWindow.isMaximized()
      ? mainWindow.unmaximize()
      : mainWindow.maximize()
  })

  ipcMain.on('window-hide', () => {
    mainWindow.minimize()
  })
  // ------------------------------------
}
app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
