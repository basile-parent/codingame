import {ChangeEvent, FC, KeyboardEvent, useCallback, useState} from 'react'
import styles from "./UsernameDialog.module.scss"

type UsernameDialogProps = {
    onSetUsername: (username: string) => Promise<void>
}
const UsernameDialog: FC<UsernameDialogProps> = ({ onSetUsername }: UsernameDialogProps) => {
    const [ userName, setUsername ] = useState<string>("")
    const [ disabled, setDisabled ] = useState<boolean>(false)

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }, [])

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()

            setDisabled(true)
            onSetUsername(userName)
                .catch(errorMessage => alert(errorMessage))
                .finally(() => setDisabled(false))
        }
    }, [ userName ])

    return (
        <div className={styles.usernameDialog}>
            <h1 className={styles.title}>Saisir un pseudo et appuyer sur Entrée</h1>
            <input type="text"
                   className={styles.input}
                   value={userName}
                   onChange={handleChange}
                   onKeyDown={handleKeyDown}
                   disabled={disabled}
                   autoFocus
            />
        </div>
    )
}

export default UsernameDialog