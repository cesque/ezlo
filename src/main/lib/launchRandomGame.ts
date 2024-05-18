import { execFile } from 'child_process'
import getFiles from './getFiles.js'
import path from 'path'

export default function launchRandomGame(romDirectory: string, emulatorPath: string) {
    const roms = getFiles(romDirectory)

    const randomRom = roms[Math.floor(Math.random() * roms.length)]
    const filePath = path.join(romDirectory, randomRom)

    const child = execFile(emulatorPath, [filePath], (error, stdout, stderr) => {
        if (error) throw error
        console.log(stdout)
    })
}