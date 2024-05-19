import styles from './Header.module.css'

import {Coolshape} from 'coolshapes-react'

import CloseIcon from '@renderer/assets/icons/close.svg?react'
import useApi from '@renderer/hooks/useApi'

export default function Header() {
    const { close } = useApi()

    return <div className={styles.header}>
        <h1 className={styles.title}>
            <Coolshape
                type="triangle"
                index={4}
                noise={true}
                size={30}
            />
            Ezlo
        </h1>

        <button type="button" className={styles.closeButton} onClick={close}>
            <CloseIcon />
        </button>
    </div>
}