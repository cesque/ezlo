import styles from './LaunchSection.module.css'

import { useGameSystemConfigurations } from '@renderer/GameSystemConfigurationsContext'
import { useState } from 'react'
import { GameSystemConfiguration } from 'src/types/GameSystemConfiguration'
import PlayIcon from '@renderer/assets/icons/play.svg?react'
import classNames from 'classnames'
import useApi from '@renderer/hooks/useApi'

export default function LaunchSection() {
    const { validConfigurations } = useGameSystemConfigurations()
    const { launchRandomGame } = useApi()

    const [selectedConfig, setSelectedConfig] = useState<GameSystemConfiguration | undefined>(validConfigurations?.[0])

    function getSelect() {
        return <select className={styles.select} value={selectedConfig?.id || ''} onChange={e => {
            const config = validConfigurations.find(config => config.id.toString() == e.target.value)
            setSelectedConfig(config)
        }}>
            { validConfigurations.map(configuration => <option value={configuration.id}>{configuration.name}</option>)}
        </select>
    }

    function launchRandomGameOfConfig(config: GameSystemConfiguration) {
        launchRandomGame(config.romDirectory, config.emulatorPath)
    }

    function launchRandomGameOfAny() {
        const randomConfig = validConfigurations[Math.floor(Math.random() * validConfigurations.length)]
        launchRandomGameOfConfig(randomConfig)
    }

    function launchRandomGameOfSelectedConfig() {
        if (selectedConfig) launchRandomGameOfConfig(selectedConfig)
    }

    return <div className={styles.section}>
        { validConfigurations.length > 0 && <div className={styles.row}>
            Launch random {getSelect()} game <button type="button" className={classNames(styles.button, styles.buttonRandomOfConfig)} onClick={launchRandomGameOfSelectedConfig}><PlayIcon className={styles.buttonIcon} /></button>
        </div> }

        <div className={styles.row}>
            Launch random game <button type="button" className={classNames(styles.button, styles.buttonRandomOfAny)} onClick={launchRandomGameOfAny}><PlayIcon className={styles.buttonIcon} /></button>
        </div>
    </div>
}