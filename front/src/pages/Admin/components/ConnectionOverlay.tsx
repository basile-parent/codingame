import {FC, useContext, useState, useEffect} from 'react'
import styles from "./ConnectionOverlay.module.scss"
import {WSContext} from "../../../common/context/WSContext";
import ConnectedIcon from "../../../common/components/ConnectedIcon";
import PingActions from "../../../common/actions/PingActions";

type ConnectionOverlayProps = {}
const ConnectionOverlay: FC<ConnectionOverlayProps> = ({}: ConnectionOverlayProps) => {
    const { wsState } = useContext(WSContext)
    const [pingOK, setPingOK] = useState<boolean>(wsState.connected)
    const [pingInterval, setPingInterval] = useState<number | null>(null)

    useEffect(() => {
        console.log("connected", wsState.connected)
        if (wsState.connected) {
            if (pingInterval) {
                console.log("clearInterval")
                clearInterval(pingInterval)
                setPingInterval(null)
            }
        } else {
            setPingOK(false)
            if (!pingInterval) {
                console.log("setInterval")
                setPingInterval(setInterval(() => {
                    PingActions.ping().then(setPingOK)
                }, 1000))
            }
        }
    }, [ wsState.connected, pingInterval ])


    return (
        <div className={`${styles.container} ${ wsState.connected ? styles.hidden : "" }`}>
            <div className={styles.content}>
                <p className={styles.title}>Vous êtes déconnecté du serveur</p>
                <p className={styles.title}>
                    <ConnectedIcon connected={pingOK} additionalClassName={styles.connectionIcon} />
                    Ping { pingOK ? "OK" : "KO !!!" }
                </p>
            </div>
        </div>
    )
}

export default ConnectionOverlay