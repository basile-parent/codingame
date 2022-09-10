import {FC, useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import styles from "./PresentationTopic.module.scss"
import dateUtils from "../../utils/dateUtils"
import AfterGameLeaderboard from "../AfterGame/AfterGameLeaderboard"
import {RootState} from "../../common/store"

type PresentationTopicProps = {}
const PresentationTopic: FC<PresentationTopicProps> = ({}: PresentationTopicProps) => {
    const game = useSelector((state: RootState) => state.game)
    const [remainingTime, setRemainingTime] = useState<number>(0)

    useEffect(() => {
        setRemainingTime(Math.round((game!.endTimer! - new Date().getTime()) / 1000))
    }, [ game!.endTimer ])

    if (!game?.topic?.timer || !remainingTime) {
        return <>Laoding...</>
    }

    let duration = game?.topic?.timer / 1000
    console.log("duration", duration)
    console.log("remainingTime", remainingTime)

    return (
        <div className={styles.container}>
            <div className={styles.progress}>
                <CountdownCircleTimer isPlaying
                                      duration={duration}
                                      initialRemainingTime={remainingTime}
                                      rotation="counterclockwise"
                                      colors={['#005fd4', '#005fd4', '#e08d00', '#e08d00', '#d54d4d', '#d54d4d', '#A30000']}
                                      colorsTime={[duration, 301, 300, 61, 60, 1, 0]}
                                      strokeWidth={35}
                                      size={400}
                                      key={`countdown-${ remainingTime }`}
                >
                    {
                        ({ remainingTime }) => (
                            <time className={styles.timer}>
                                { dateUtils.timeToString(remainingTime) }
                            </time>
                        )
                    }
                </CountdownCircleTimer>
            </div>

            <AfterGameLeaderboard setCodeDialogContent={() => {}} className={styles.playerList} />
        </div>
    )
}

export default PresentationTopic