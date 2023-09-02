const { app, ipcMain, dialog } = require('electron');
const { autoUpdater } = require("electron-updater");
let { useIsDev } = require('./helpers.js')
let { version: pkgVersion } =  require('../package.json')

let updateStatus = {
  requiresUpdate: undefined
}

let isNewVersion = (current, unknown) => {
  let [cur, unk] = [current.split('.'), unknown.split('.')]
  for (let i=0; i<=2; i++) {
    let diff = (+unk[i]) - (+cur[i])
    if (diff > 0) return true;   // unknown is a newer version
    if (diff < 0) return false;  // unknown is an older version
  }
  return false  // unknown is the same version as current
}

// On startup
function useAutoUpdate () {
  let isDev = useIsDev()
  if (isDev || !app.isPackaged) return

  autoUpdater.on("error", err => {
    console.log(JSON.stringify({type: 'AUTO-UPDATE: DEFAULT ERROR', msg: err?.message, err}))
    if (err.code === "ERR_XML_MISSED_ELEMENT") return 
    dialog.showErrorBox(
      `AUTO-UPDATE ERROR`,
      err?.message
    )
  })

  // Checking updates just after app launch and notify if true
  app.on('will-finish-launching', async () => {
    updateStatus.requiresUpdate = new Promise(async (resolve, reject) => {
      setTimeout(resolve, 500, false) 
      // failsafe – autoUpdater causes infinite hang if no version exists.
      // This function will continue to execute as normal, additional resolves do nothing

      let latestVer;
      try {
        let response = await autoUpdater.checkForUpdates()
        latestVer = response?.versionInfo?.version
      } catch (err) {
        console.log(JSON.stringify({type: 'AUTO-UPDATE: LAUNCH ERROR', msg: err?.message, err}))
      }
      
      if (latestVer === undefined) return resolve(false);
      if (pkgVersion === latestVer) return resolve(false);  // catch most common case
      if (!isNewVersion(pkgVersion, latestVer)) return resolve(false);  // catch unreleased version eg: dev 2.0.2 != latest 2.0.1
      
      // Alert new version available
      resolve(true)

      // Await download then update (re-opens automatically)
      autoUpdater.on('update-downloaded', (event, releaseNotes) => {
        autoUpdater.quitAndInstall(true, true)
      })

      // Open Prompt
      dialog.showMessageBox({
        message: `New Update – v${latestVer} is downloading...\nPress "ok" to continue.`
      })
    })
  })
}

// During app runtime
function useUpdateAlert(win) {
  let isDev = useIsDev()
  if (isDev || !app.isPackaged) return

  // Check for updates on a regular interval 
  let checkInterval = 3 * 60 * 60e3  // 3hr - runtime checks are prob not necessary tbh
  setInterval(async () => {
    try {
      let res = await autoUpdater.checkForUpdatesAndNotify()
    } catch (err) {
      console.log(JSON.stringify({type: 'AUTO-UPDATE: RUNTIME-ERROR', msg: err.message, err}))
    }
  }, checkInterval)

  // Alert when update is available 
  autoUpdater.on('update-downloaded', (event, releaseNotes) => {
    win?.webContents?.send('update-downloaded', true);
    win?.webContents?.send('toast', {
      message: 'New update available!',
      type: 'info'
    })
  })

  // User has opted to update now
  ipcMain.on('handleUpdate', () => {
    autoUpdater.quitAndInstall(true, true)  
  })
}


module.exports = { useAutoUpdate, useUpdateAlert, updateStatus }
