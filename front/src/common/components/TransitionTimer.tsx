import {FC, useContext, useEffect, useState} from 'react'
import styles from "./TransitionTimer.module.scss"
import {WSContext} from "../context/WSContext";

type TransitionTimeoutProps = {}
const TransitionTimer: FC<TransitionTimeoutProps> = ({}: TransitionTimeoutProps) => {
    const { wsState } = useContext(WSContext)
    const [ transitionTimeout, setTransitionTimeout ] = useState(wsState.transitionTimeout ? wsState.transitionTimeout / 1000 : 0)

    useEffect(() => {
        const newTransitionTimeout = wsState.transitionTimeout
        if (newTransitionTimeout) {
            setTransitionTimeout(newTransitionTimeout / 1000)
        } else {
            setTransitionTimeout(0)
        }
    }, [ wsState.transitionTimeout ])

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