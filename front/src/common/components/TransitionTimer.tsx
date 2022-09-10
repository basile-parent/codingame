import {FC, useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import styles from "./TransitionTimer.module.scss"
import {RootState} from "../store"

type TransitionTimeoutProps = {}
const TransitionTimer: FC<TransitionTimeoutProps> = ({}: TransitionTimeoutProps) => {
    const storeTransitionTimeout = useSelector((state: RootState) => state.transitionTimeout)
    const [ transitionTimeout, setTransitionTimeout ] = useState(storeTransitionTimeout ? storeTransitionTimeout / 1000 : 0)

    useEffect(() => {
        const newTransitionTimeout = storeTransitionTimeout
        if (newTransitionTimeout) {
            setTransitionTimeout(newTransitionTimeout / 1000)
        } else {
            setTransitionTimeout(0)
        }
    }, [ storeTransitionTimeout ])

    if (!transitionTimeout) {
        return <></>
    }

    return (
        <div className={styles.container}>
            {
                Array.apply(null, Array(transitionTimeout)).map((_, index) => (
                    <p key={`timeout-${ index }`}
                       style={{
                           animationDelay: `${ transitionTimeout - index - 1}s`
                       }}
                    >
                        { index + 1 }
                    </p>
                ))
            }

        </div>
    )
}

export default TransitionTimer