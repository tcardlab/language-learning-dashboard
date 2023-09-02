// Node Imports
const { contextBridge, ipcRenderer, clipboard, shell } = require('electron');
//const { validEndpoints } = require('./api.js');



const isDev = process.argv.includes('dev')



const api = {
  versions: process.versions,
  clipboard,

  send: (channel, data) => {  // render -> preload(u r here) ->  main
    // whitelist channels
    let validChannels = [
      'close', 'hide', 'minimize', 'toggleMax', 'uninstall', 'doQuit', 'handleUpdate'
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  
  on: (channel, func) => {  // main -> preload(u r here) ->  render
    let validChannels = [
      'beforeQuit', 'update-downloaded'
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  clear: (channel) => {
    ipcRenderer.removeAllListeners(channel)
  },

  invoke: async (endpoint, arg) => {
    let validChannels = [];
    if (validChannels.includes(endpoint)) {
      return await ipcRenderer.invoke(endpoint, arg);
    }
    throw new Error('Invalid channel');
  },

  server: async (endpoint, argArr=[], url) => {
    if ( true /* validEndpoints.includes(endpoint) */) {
      return await ipcRenderer.invoke('server', {endpoint, argArr, url});
    } else {
      throw new Error(`Invalid endpoint: ${endpoint}`);
    }
  },

  openExternal: (url) => {
    shell.openExternal(url);
  },

  winState () {
    return ipcRenderer.sendSync('winState', {});
  }
};



contextBridge.exposeInMainWorld('API', api);
