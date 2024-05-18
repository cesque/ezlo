import { readdirSync } from 'fs'

export default function getFiles(directory: string) {
    const results = readdirSync(directory)

    return results
}