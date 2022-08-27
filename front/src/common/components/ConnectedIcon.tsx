import {FC, useContext} from 'react'
import styles from "./ConnectedIcon.module.scss"

type ConnectedIconProps = {
    connected: boolean,
    additionalClassName?: string
}
const ConnectedIcon: FC<ConnectedIconProps> = ({ connected, additionalClassName }: ConnectedIconProps) => {
    return (
        <span className={`${ styles.icon } ${ connected ? styles.connected : styles.disconnected} ${ additionalClassName }`}>
        </span>
    )
}

export default ConnectedIcon