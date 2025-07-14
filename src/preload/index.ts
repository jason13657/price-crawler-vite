import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { GroupedItems } from '@common/type'

// Custom APIs for renderer
const api = {
  scrape: (keywords: string[], selectedLocation: string): Promise<GroupedItems> =>
    new Promise((resolve, reject) => {
      ipcRenderer.once('scrape:done', (_e, data) => resolve(data))
      ipcRenderer.once('scrape:error', (_e, err) => reject(err))
      ipcRenderer.send('scrape:start', keywords, selectedLocation)
    })
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
