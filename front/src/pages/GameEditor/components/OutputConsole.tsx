import {FC} from 'react'
import styles from "./OutputConsole.module.scss"

type OutputConsoleProps = {}
const OutputConsole: FC<OutputConsoleProps> = ({}: OutputConsoleProps) => {
    return (
        <>
            <p className={styles.title}>Sortie standard:</p>
            <pre className={styles.console}>- 11122</pre>

            <div className={`${ styles.notification } is-success is-light`}>Success</div>
        </>
    )
}

export default OutputConsole