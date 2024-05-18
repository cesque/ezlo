import { GameSystemConfiguration } from 'src/types/GameSystemConfiguration'
import styles from './Config.module.css'
import { useMemo, useState } from 'react'
import Input from '@renderer/components/Input/Input'
import classNames from 'classnames'

import DeleteIcon from '@renderer/assets/icons/trash.svg?react'
import SaveIcon from '@renderer/assets/icons/check.svg?react'
import { useGameSystemConfigurations } from '@renderer/GameSystemConfigurationsContext'

interface Props {
    configuration: GameSystemConfiguration
}

export default function Config({ configuration }: Props) {
    const {
        gameSystemConfigurations,
        dispatch,
    } = useGameSystemConfigurations()

    const { id, name, romDirectory, emulatorPath } = configuration

    const [nameValue, setNameValue] = useState(name)
    const [romDirectoryValue, setRomDirectoryValue] = useState(romDirectory)
    const [emulatorPathValue, setEmulatorPathValue] = useState(emulatorPath)

    const anyIsDirty = useMemo(() => {
        return nameValue != name
            || romDirectoryValue != romDirectory
            || emulatorPathValue != emulatorPath
    }, [name, romDirectory, emulatorPath, nameValue, romDirectoryValue, emulatorPathValue])

    function deleteConfig() {
        dispatch({
            type: 'DELETE',
            payload: {
                id,
            }
        })
    }

    function updateConfig() {
        if (!anyIsDirty) return
        dispatch({
            type: 'UPDATE',
            payload: {
                id,
                data: {
                    name: nameValue,
                    romDirectory: romDirectoryValue,
                    emulatorPath: emulatorPathValue,
                }
            }
        })
    }

    return <li className={styles.item}>
        <div className={styles.row}>
            <Input label="Name" savedValue={name} value={nameValue} onChange={setNameValue} />

            <div className={styles.actions}>
                <button type="button" className={classNames(styles.button, styles.buttonDelete)} onClick={deleteConfig}>
                    <DeleteIcon className={styles.buttonIcon} />
                </button>
                <button type="button" className={classNames(styles.button, styles.buttonSave)} onClick={updateConfig} disabled={!anyIsDirty}>
                    <SaveIcon className={styles.buttonIcon} />
                </button>
            </div>
        </div>
       
        <Input label="ROM Directory" savedValue={romDirectory} value={romDirectoryValue} onChange={setRomDirectoryValue} />
        <Input label="Emulator Path" savedValue={emulatorPath} value={emulatorPathValue} onChange={setEmulatorPathValue} />
    </li>
}