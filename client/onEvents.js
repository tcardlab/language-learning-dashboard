const { isMac } = require('./helpers.js');
const { app, ipcMain } = require('electron')



/***   ipcMain   ***/
function useOnEvents(win) {
  app.on('window-all-closed', () => { app.quit() })

  ipcMain.on('minimize', (evt, arg) => {
    isMac || win?.blur();
    win?.minimize()
  })

  ipcMain.on('toggleMax', (evt, arg) => {
    if(isMac) {
      win?.isFullScreen() ? win?.setFullScreen(false) : win?.setFullScreen(true);
    } else {
      win?.isMaximized() ? win?.restore() : win?.maximize()
    }
  })

  ipcMain.on('hide', (evt, arg) => {
    win?.hide()
  })

  app.on('activate', ()=>{
    win?.show() // recover hidden window on mac dock icon click
  })
}


module.exports = { useOnEvents }