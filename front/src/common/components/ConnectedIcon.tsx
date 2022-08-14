import {FC, useContext} from 'react'
import {WSContext} from "./context/WSContext";
import styles from "./ConnectedIcon.module.scss"

type ConnectedIconProps = {
    connected: boolean
}
const ConnectedIcon: FC<ConnectedIconProps> = ({ connected }: ConnectedIconProps) => {
    return (
        <span className={`${ styles.icon } ${ connected ? styles.connected : styles.disconnected}`}>
        </span>
    )
}

export default ConnectedIcon