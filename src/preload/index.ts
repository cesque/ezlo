import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Api } from '../types/Api'
import { GameSystemConfiguration } from '../types/GameSystemConfiguration'

// Custom APIs for renderer
const api: Api = {
    getFiles: (directory: string) => ipcRenderer.invoke('get-files', { directory }),
    launchRandomGame: (romDirectory: string, emulatorPath: string) => ipcRenderer.send('launch-random-game', { romDirectory, emulatorPath }),
    close: () => ipcRenderer.send('close'),
    loadConfigs: () => ipcRenderer.invoke('get-configs', {}),
    saveConfigs: (configs: GameSystemConfiguration[]) => ipcRenderer.send('save-configs', { configs }),
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
