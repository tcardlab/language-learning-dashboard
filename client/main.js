// Local Imports
const { useAutoUpdate, useUpdateAlert, updateStatus } = require('./autoUpdate.js')
const { setIsDev, initWin, useHelpers } = require('./helpers.js')
const { useOnEvents } = require('./onEvents.js')

// Node Imports
const { app, BrowserWindow } = require('electron')
const { resolve } = require('path')
const { ipcMain } = require('electron')



/***   On Startup   ***/
const isDev = setIsDev( (process.argv.includes('dev')) && !app.isPackaged )
useAutoUpdate()



/***   INIT SERVER   ***/
const { run_script } = require('./runScript.js')
const { join } = require('path')

app.whenReady().then(async () => {
  run_script('dir', [process.resourcesPath])
  let flaskExe = join(process.resourcesPath, 'server\\ll-dashboard.server.exe')
  run_script(flaskExe)
})



/***   Main Window   ***/
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 820,
    autoHideMenuBar: true,
    webPreferences: {
      preload: resolve(__dirname, './preload.js')
    }
  })

  initWin(win)

  if ( isDev ) {
    console.log('Electron launched in "dev" mode.')
    win?.loadURL('http://localhost:3000')  // for dev hot-loading
  } else {
    console.log('Electron launched in "prod" mode.')
    win?.loadURL('http://localhost:5000')  // for dev hot-loading
    //win?.loadFile(resolve(__dirname, '../dist/index.html'))  // traditional method
  }
}

async function restoreOrCreateWindow() {
  // https://github.com/cawa-93/vite-electron-builder/blob/main/packages/main/src/index.ts
  let win = BrowserWindow.getAllWindows().find(w => !w.isDestroyed()); 

  if (win === undefined || win === null) {
    win = await createWindow();
  }

  if (win.isMinimized()) win.restore();

  let { handleOpen } = useHelpers(win)
  handleOpen()  // to ensure its both visible and docked on mac

  win.focus();
}

Single_Instance : {
  app.on('second-instance', restoreOrCreateWindow);
  let isSingleInstance = app.requestSingleInstanceLock()
  if (!isSingleInstance) app.quit()
}

app.whenReady().then(async () => {
  createWindow()     // inits win
  handleWinDeps(win) // register win deps

  app.on('activate', () => {
    restoreOrCreateWindow()
  })

  win.once('ready-to-show', async () => {
    let isUpdating = await updateStatus.requiresUpdate
    if (isUpdating) {
      // Should prevent ui opening (manual & automatic) during updates
      return
    }
    
    win?.show();
  })
})


function handleWinDeps(win) {
  // useUpdateAlert(win)
  useOnEvents(win)
}

ipcMain.on('winState', (e) => e.returnValue = win?.isMaximized() || win?.isFullScreen())
