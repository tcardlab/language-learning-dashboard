const { app } = require('electron')



/***   Independent   ***/
const isMac = process.platform === 'darwin'
const isWin = process.platform === 'win32'
const isLinux = process.platform === 'linux'

let ensureArr = (...args) => args.map(v=>Array.isArray(v) ? v : [v])



/***   Window Dependent   ***/
const useHelpers = (win) => {
  let windowHandlers = {
    handleOpen() {
      win?.show()
      isMac && app.dock.show()
    },
  
    toggleShow() {
      if (win?.isVisible()) {
        win?.hide() 
        isMac && app.dock.hide()
      } else {
        windowHandlers.handleOpen()
      }
    },
  
    handleClose() {
      try {
        if (typeof win === "undefined" || win === null ) return
        win?.hide()
        win?.webContents?.send('beforeQuit', {})
        // src/stores/userState :: handleQuit() => src-elect/main :: on('doQuit')
      } catch (err) {
        console.log(JSON.stringify({type:'ERROR: handleClose', details: "prob destroyed win", msg:''+err?.message, err}))
      }
    }
  }

  return windowHandlers
}



/***   Other external dependents   ***/
let isDev;
let setIsDev = (val) => isDev = val;
let useIsDev = () => isDev;



/***   Export   ***/
let winRef;
module.exports = {
  isMac,
  isWin,
  isLinux,
  ensureArr,

  initWin: (ogWin) => { winRef = ogWin },
  useWin: () => (winRef || null),

  setIsDev,
  useIsDev,

  useHelpers
}
