import { useId } from 'react'
import styles from './Input.module.css'
import classNames from 'classnames'

interface Props {
    label: string
    value: string
    savedValue: string
    onChange: (value: string) => void
}

export default function Input({ label, value, savedValue, onChange }) {
    const id = useId()

    const classes = classNames(styles.container, {
        [styles.containerDirty]: value != savedValue,
        [styles.containerHasValue]: !!value,
    })

    return <div className={classes}>
        <input type="text" onChange={e => onChange(e.target.value)} value={value} id={id} name={id} className={styles.input} />
        <label htmlFor={id} className={styles.label}>{label}</label>
    </div>
}