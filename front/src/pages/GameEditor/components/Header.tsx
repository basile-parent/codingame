import {FC, useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPuzzlePiece, faHourglass} from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as AtecnaIcon} from "../../../assets/logo-cube.svg"
import styles from "./Header.module.scss"

type HeaderProps = {}
const Header: FC<HeaderProps> = ({}: HeaderProps) => {
    const [timerString, setTimerString] = useState<string>("")
    const [isEnding, setIsEnding] = useState<boolean>(false)

    useEffect(() => {
        runTimer("2022-08-01T15:00:00", setTimerString, setIsEnding)
    }, [])

    return (
        <header className={styles.header}>
            <h1>
                <AtecnaIcon/>
                Codingame Atecna
            </h1>
            <p className={styles.gameMode}>
                <FontAwesomeIcon icon={faPuzzlePiece}/>
                Mode de jeu : Le + rapide
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