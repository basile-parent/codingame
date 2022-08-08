import {FC, useEffect, useState} from 'react'
import styles from "./Timer.module.scss"

type TimerProps = {
    endTimer?: number
}
const Timer: FC<TimerProps> = ({ endTimer }: TimerProps) => {
    const [timerString, setTimerString] = useState<string>("--:--")
    const [isEnding, setIsEnding] = useState<boolean>(false)

    useEffect(() => {
        if (endTimer) {
            runTimer(new Date(endTimer + 2000).toISOString(), setTimerString, setIsEnding)
        }
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