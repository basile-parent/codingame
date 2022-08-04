import {FC, useContext} from 'react'
import {WSContext} from "./context/WSContext";
import styles from "./ConnectedIcon.module.scss"

type ConnectedIconProps = {}
const ConnectedIcon: FC<ConnectedIconProps> = ({}: ConnectedIconProps) => {
    const { state } = useContext(WSContext);

    return (
        <div className={`${ styles.icon } ${ state.connected ? styles.connected : styles.diconnected}`}>
        </div>
    )
}

export default ConnectedIcon