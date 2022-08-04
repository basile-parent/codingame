import {FC, useCallback, useContext, useState} from 'react'
import playerUtils from "../../utils/playerUtils";
import UsernameDialog from "./components/UsernameDialog";
import {WSContext} from "../../common/context/WSContext";
import {ReactComponent as AtecnaIcon} from "../../assets/logo-cube.svg"
import styles from "./LandingPage.module.scss"
import PlayerList from "./components/PlayerList";

type LandingPageProps = {
    presentationMode?: boolean
}
const LandingPage: FC<LandingPageProps> = ({ presentationMode }: LandingPageProps) => {
    const [userName, setUsername] = useState<string | null>(playerUtils.getPlayerName())
    const {state, dispatch} = useContext(WSContext);

    const recordUsername = useCallback((newUserName: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!newUserName) {
                reject("Vous devez spécifier un nom")
                return
            }
            dispatch({type: "setName", payload: newUserName})
            playerUtils.setPlayerName(newUserName)
            setUsername(newUserName)
        })
    }, [])

    if (!userName) {
        return <UsernameDialog onSetUsername={recordUsername}/>
    }

    return (
        <>
            <article className={styles.landingPage}>
                <section className={styles.landingPageContent}>
                    <AtecnaIcon height="200px" width="200px" />
                    <h1>Codingame Atecna</h1>

                    {
                        !state.connected ?
                            <h2>Connection en cours...</h2>:
                            <PlayerList />
                    }


                    { presentationMode && <button className="button is-success">Démarrer le jeu</button> }
                </section>

                {
                    presentationMode &&
                    <aside className={styles.gameLink}>Pour rejoindre: <span>https://codingame.basileparent.fr</span></aside>
                }
            </article>
        </>
    )
}

export default LandingPage