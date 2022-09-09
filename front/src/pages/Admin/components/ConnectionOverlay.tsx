import {FC, useEffect, useState} from 'react'
import styles from "./ConnectionOverlay.module.scss"
import ConnectedIcon from "../../../common/components/ConnectedIcon"
import PingActions from "../../../common/actions/PingActions"
import {useSelector} from "react-redux"
import {RootState} from "../../../common/store"

type ConnectionOverlayProps = {}
const ConnectionOverlay: FC<ConnectionOverlayProps> = ({}: ConnectionOverlayProps) => {
    const connected = useSelector((state: RootState) => state.connected)
    const [pingOK, setPingOK] = useState<boolean>(connected)
    const [pingInterval, setPingInterval] = useState<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (connected) {
            if (pingInterval) {
                clearInterval(pingInterval)
                setPingInterval(null)
            }
        } else {
            setPingOK(false)
            if (!pingInterval) {
                setPingInterval(setInterval(() => {
                    PingActions.ping().then(result => {
                        console.debug("Ping to back: ", result)
                        setPingOK(result)
                    })
                }, 1000))
            }
        }
    }, [ connected, pingInterval ])

    return (
        <div className={`${styles.container} ${ connected ? styles.hidden : "" }`}>
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