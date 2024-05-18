import Store from 'electron-store'
import { GameSystemConfiguration } from '../../types/GameSystemConfiguration'

export default function loadConfigs(store: Store): GameSystemConfiguration[] {
    // @ts-ignore
    return store.get('configs') as GameSystemConfiguration[]
}