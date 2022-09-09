import {FC} from 'react'
import styles from "./ConnectedIcon.module.scss"
import ConnectedIcon from "./ConnectedIcon";
import {useSelector} from "react-redux";
import {RootState} from "../store";

type ConnectedAppIconProps = {}
const ConnectedAppIcon: FC<ConnectedAppIconProps> = ({}: ConnectedAppIconProps) => {
    const connected = useSelector((state: RootState) => state.connected)

    return (
        <div className={styles.wrapper}>
            <ConnectedIcon connected={connected} />
        </div>
    )
}

export default ConnectedAppIcon