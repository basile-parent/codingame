import {FC, useContext, useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPuzzlePiece, faHourglass} from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as AtecnaIcon} from "../../../assets/logo-cube.svg"
import styles from "./Header.module.scss"
import {WSContext} from "../../../common/context/WSContext";
import {GameMode} from "../../../types/Game";

type HeaderProps = {}
const Header: FC<HeaderProps> = ({}: HeaderProps) => {
    const [timerString, setTimerString] = useState<string>("")
    const [isEnding, setIsEnding] = useState<boolean>(false)
    const {wsState} = useContext(WSContext)

    useEffect(() => {
        runTimer(new Date(wsState.game!.endTimer!).toISOString(), setTimerString, setIsEnding)
    }, [])

    return (
        <header className={styles.header}>
            <h1>
                <AtecnaIcon/>
                Codingame Atecna
            </h1>
            <p className={styles.gameMode}>
                <FontAwesomeIcon icon={faPuzzlePiece}/>
                Mode de jeu : &nbsp;
                {
                    wsState.game?.topic.gameMode === GameMode.FASTEST ? "Le + rapide" :
                        wsState.game?.topic.gameMode === GameMode.SHORTEST ? "Le + court" :
                            "???"
                }
            </p>
            <p className={styles.timer}>
                <FontAwesomeIcon icon={faHourglass}/>
                Timer:
                <time className={isEnding ? styles.ending : undefined}>{timerString}</time>
            </p>
        </header>
    )
}

const runTimer = (date: string,
                  setTimerString: (s: string) => void,
                  setIsEnding: (b: boolean) => void) => {
    const worker = new Worker(new URL('../lib/timer.worker.js', import.meta.url))

    worker.addEventListener('message', e => {
        switch (e.data.action) {
            case "updateCountdown":
                const {minutes, seconds, remainingInSeconds} = e.data.value
                const countdown = (minutes + "").padStart(2, "0") + ":" + (seconds + "").padStart(2, "0")
                setTimerString(countdown)
                setIsEnding(remainingInSeconds < 60)
                break;
            case "endCountdown":
                console.log("End countdown")
                // showEndOfTime();
                break;
        }
    });

    worker.postMessage({action: "setupEndDate", date})
    worker.postMessage({action: "startCountdown"})
};

export default Header