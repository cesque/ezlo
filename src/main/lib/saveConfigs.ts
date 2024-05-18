import Store from 'electron-store'
import { GameSystemConfiguration } from '../../types/GameSystemConfiguration';

export default function saveConfigs(store: Store, configs: GameSystemConfiguration) {
    // @ts-ignore
    store.set('configs', configs)
}