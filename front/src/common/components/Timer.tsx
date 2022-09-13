import {FC, useEffect, useState} from 'react'
import styles from "./Timer.module.scss"

export type TimerProps = {
    endTimer: number,
    onEndTimer?: () => void,
    className?: string,
}
const Timer: FC<TimerProps> = ({ endTimer, onEndTimer, className }: TimerProps) => {
    const [timerString, setTimerString] = useState<string>("--:--")
    const [isEnding, setIsEnding] = useState<boolean>(false)

    useEffect(() => {
        if (endTimer) {
            const worker = runTimer(new Date(endTimer).toISOString(), setTimerString, setIsEnding, onEndTimer)
            return () => worker.terminate()
        }
    }, [ endTimer, onEndTimer ])

    if (!endTimer) {
        return <time>--:--</time>
    }

    return (
        <time className={`${ isEnding ? styles.ending : "" } ${ className }`}>{timerString}</time>
    )
}

const runTimer = (date: string,
                  setTimerString: (s: string) => void,
                  setIsEnding: (b: boolean) => void,
                  onEndTimer?: () => void): Worker => {
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
                onEndTimer && onEndTimer()
                break;
        }
    });

    worker.postMessage({action: "setupEndDate", date})
    worker.postMessage({action: "startCountdown"})

    return worker
};

export default Timer