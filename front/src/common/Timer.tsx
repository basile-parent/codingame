import {FC, useContext, useEffect, useState} from 'react'
import {WSContext} from "./context/WSContext"
import styles from "./Timer.module.scss"

type TimerProps = {}
const Timer: FC<TimerProps> = ({}: TimerProps) => {
    const [timerString, setTimerString] = useState<string>("")
    const [isEnding, setIsEnding] = useState<boolean>(false)
    const {wsState} = useContext(WSContext)

    useEffect(() => {
        runTimer(new Date(wsState.game!.endTimer! + 2000).toISOString(), setTimerString, setIsEnding)
    }, [])

    return (
        <time className={isEnding ? styles.ending : undefined}>{timerString}</time>
    )
}

const runTimer = (date: string,
                  setTimerString: (s: string) => void,
                  setIsEnding: (b: boolean) => void) => {
    const worker = new Worker(new URL('./Timer.worker.js', import.meta.url))

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

export default Timer