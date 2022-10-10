import {FC, useEffect, useState} from 'react'
import styles from "./Timer.module.scss"
import dateUtils from "../../utils/dateUtils";

export type TimerProps = {
    endTimer: number,
    onEndTimer?: () => void,
    className?: string,
}
const Timer: FC<TimerProps> = ({ endTimer, onEndTimer, className }: TimerProps) => {
    const [timerString, setTimerString] = useState<string>(_getInitFormattedTime(endTimer))
    const [isEnding, setIsEnding] = useState<boolean>(false)

    useEffect(() => {
        if (endTimer) {
            const worker = _runTimer(new Date(endTimer).toISOString(), setTimerString, setIsEnding, onEndTimer)
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

const _getInitFormattedTime = (endTimer: number) => {
    const diff = new Date(endTimer).getTime() - new Date().getTime()
    return dateUtils.timeToString(Math.round(diff / 1000))
}

const _runTimer = (endDate: string,
                   setTimerString: (s: string) => void,
                   setIsEnding: (b: boolean) => void,
                   onEndTimer?: () => void): Worker => {
    const worker = new Worker(new URL('./Timer.worker.js', import.meta.url))

    worker.addEventListener('message', e => {
        switch (e.data.action) {
            case "updateCountdown":
                const {remainingInSeconds} = e.data.value
                setTimerString(dateUtils.timeToString(remainingInSeconds))
                setIsEnding(remainingInSeconds < 60)
                break;
            case "endCountdown":
                onEndTimer && onEndTimer()
                break;
        }
    });

    worker.postMessage({action: "setupEndDate", date: endDate})
    worker.postMessage({action: "startCountdown"})

    return worker
};

export default Timer