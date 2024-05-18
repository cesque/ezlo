import { GameSystemConfiguration } from './GameSystemConfiguration'

export type Api = {
    getFiles: (directory: string) => Promise<string[]>
    saveConfigs: (configs: GameSystemConfiguration[]) => void
    loadConfigs: () => Promise<GameSystemConfiguration[]>
    launchRandomGame: (romDirectory: string, emulatorPath: string) => void
    close: () => void
}