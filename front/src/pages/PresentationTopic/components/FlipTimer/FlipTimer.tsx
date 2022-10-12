import {FC, useEffect} from "react"
import FlipdownNumber from "./components/FlipdownNumber"
import {useTimerString} from "../../../../common/components/Timer"
import dateUtils from "../../../../utils/dateUtils"
import styles from "./FlipTimer.module.scss"

type FlipTimerProps = {
    timer: number,
}
const FlipTimer: FC<FlipTimerProps> = ({ timer }: FlipTimerProps) => {
    const previousTimer = timer + 1
    const timerString = dateUtils.timeToString(timer)
    const previousTimerString = dateUtils.timeToString(previousTimer)

    return (
        <div className={styles.wrapper}>
            {
                [ ...timerString ].map((character: string, index: number) => (
                    isNaN(character as any) ?
                        <span className={styles.separator} key={`countdown_char_${ index }`}>{ character }</span>
                        :
                        <FlipdownNumber previousNumber={+previousTimerString.charAt(index)}
                                        currentNumber={+character}
                                        key={`countdown_char_${ index }`}
                        />
                ))
            }
        </div>
    )
}

export default FlipTimer