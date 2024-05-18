import styles from './ConfigList.module.css'

import PlusIcon from '@renderer/assets/icons/plus.svg?react'
import { useGameSystemConfigurations } from '@renderer/GameSystemConfigurationsContext'
import Config from './Config/Config'

export default function ConfigList() {
    const {
        gameSystemConfigurations,
        dispatch,
    } = useGameSystemConfigurations()

    function addNewConfig() {
        dispatch({
            type: 'ADD',
            payload: undefined,
        })
    }

    return <div className={styles.container}>
        <div className={styles.controls}>
            <h2 className={styles.title}>Configurations</h2>
            <button type="button" className={styles.addButton} onClick={addNewConfig}>
                <PlusIcon />
            </button>
        </div>
        <ul className={styles.list}>
            { gameSystemConfigurations.map(configuration => <Config configuration={configuration} />) }
        </ul>
    </div>
}