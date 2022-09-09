import {FC, useCallback, useState} from 'react'
import playerUtils from "../../utils/playerUtils"
import UsernameDialog from "./components/UsernameDialog"
import {ReactComponent as AtecnaIcon} from "../../assets/logo-cube.svg"
import styles from "./LandingPage.module.scss"
import PlayerList from "./components/PlayerList"
import {DisplayMode} from "../../types/DisplayMode"
import WebsocketManager from "../../common/components/WebsocketManager"
import {useSelector} from "react-redux"
import {RootState} from "../../common/store"

type LandingPageProps = {
    mode: DisplayMode
}
const LandingPage: FC<LandingPageProps> = ({ mode }: LandingPageProps) => {
    const [userName, setUsername] = useState<string | null>(playerUtils.getPlayerName())
    const connected = useSelector((state: RootState) => state.connected)
    const game = useSelector((state: RootState) => state.game)
    const waitForApproval = useSelector((state: RootState) => state.waitForApproval)

    const recordUsername = useCallback((newUserName: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!newUserName) {
                reject("Vous devez spécifier un nom")
                return
            }
            WebsocketManager.setName(newUserName)
            playerUtils.setPlayerName(newUserName)
            setUsername(newUserName)
        })
    }, [])

    return (
        <>
            { !userName && mode === DisplayMode.PLAYER && <UsernameDialog onSetUsername={recordUsername}/> }

            <article className={styles.landingPage}>
                <section className={styles.landingPageContent}>
                    <AtecnaIcon height="200px" width="200px" />

                    <h1>Codingame Atecna</h1>

                    {
                        !connected ?
                            <h2>Connection en cours...</h2> :
                            waitForApproval ?
                                <h2>L'administrateur doit approuver votre demande d'accès...</h2> :
                                <PlayerList onChangeName={() => setUsername(null)} />
                    }
                </section>

                {
                    mode === DisplayMode.PRESENTATION &&
                    <aside className={`${styles.gameLink} ${ game?.started ? styles.connectionOver : ""}`}>
                      Pour rejoindre: <span>https://app.basileparent.fr/codingame</span>
                    </aside>
                }
            </article>
        </>
    )
}

export default LandingPage