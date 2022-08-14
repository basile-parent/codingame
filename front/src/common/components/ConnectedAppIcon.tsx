import {FC, useContext} from 'react'
import {WSContext} from "../context/WSContext";
import styles from "./ConnectedIcon.module.scss"
import ConnectedIcon from "./ConnectedIcon";

type ConnectedAppIconProps = {}
const ConnectedAppIcon: FC<ConnectedAppIconProps> = ({}: ConnectedAppIconProps) => {
    const { wsState } = useContext(WSContext)

    return (
        <div className={styles.wrapper}>
            <ConnectedIcon connected={wsState.connected} />
        </div>
    )
}

export default ConnectedAppIcon