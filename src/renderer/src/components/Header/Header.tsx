import styles from './Header.module.css'

import CloseIcon from '@renderer/assets/icons/close.svg?react'
import useApi from '@renderer/hooks/useApi'

export default function Header() {
    const { close } = useApi()

    return <div className={styles.header}>
        <h1 className={styles.title}>Ezlo</h1>

        <button type="button" className={styles.closeButton} onClick={close}>
            <CloseIcon />
        </button>
    </div>
}