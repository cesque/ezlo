import styles from './App.module.css'

import { GameSystemConfiguration } from 'src/types/GameSystemConfiguration';
import { GameSystemConfigurationsProvider } from './GameSystemConfigurationsContext';
import ConfigList from './components/ConfigList/ConfigList';

import Header from './components/Header/Header'
import useApi from './hooks/useApi'

import { HTMLAttributes as H, useEffect, useState } from 'react'
import LaunchSection from './components/LaunchSection/LaunchSection';

declare module 'react' {
    interface InputHTMLAttributes<T> extends H<T> {
      // extends React's HTMLAttributes
      directory?: string;
      webkitdirectory?: string;
    }
}

function App(): JSX.Element {
    const [loadedConfigs, setLoadedConfigs] = useState<GameSystemConfiguration[] | undefined>()
    const { loadConfigs } = useApi()

    // async function gf() {
    //     const result = await getFiles(romDirectory)

    //     console.log(result)
    // }

    useEffect(() => {
        fetchConfigsFromSaved()
    }, [])
    
    async function fetchConfigsFromSaved() {
        const configs = await loadConfigs()

        console.log('loaded configs:')
        console.log(configs)

        setLoadedConfigs(configs)
    }

    if (!loadedConfigs) {
        return <div className={styles.loading}>loading...</div>
    }

    return <GameSystemConfigurationsProvider loadedConfigurations={loadedConfigs}>
        <div className={styles.app}>
            <Header />
            <LaunchSection />

            <ConfigList />
        </div>
    </GameSystemConfigurationsProvider>
}

export default App
