import {FC, useEffect, useState} from "react"
import {useSelector} from "react-redux"
// import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import styles from "./PresentationTopic.module.scss"
import AfterGameLeaderboard from "../AfterGame/AfterGameLeaderboard"
import {RootState} from "../../common/store"
import FlipTimer from "./components/FlipTimer";
import ProgressBar from "./components/ProgressBar";
import {useTimerString} from "../../common/components/Timer";

type PresentationTopicProps = {}
const PresentationTopic: FC<PresentationTopicProps> = ({}: PresentationTopicProps) => {
    const game = useSelector((state: RootState) => state.game)

    const onEndTimer = () => {}
    const [ timer, isEnding ] = useTimerString(game?.endTimer || 0, onEndTimer)

    // TODO The timer worker is launched and terminated every second...
    
    //
    // useEffect(() => {
    //     setRemainingTime(Math.round((game!.endTimer! - new Date().getTime()) / 1000))
    // }, [ game!.endTimer ])

    // if (!game?.topic?.timer) {
    if (!game?.topic?.timer || !game?.endTimer) {
        return <>Loading...</>
    }

    return (
        <div className={styles.container}>
            <div className={styles.progress}>
                <FlipTimer timer={timer} />
                <ProgressBar initialDuration={game.topic.timer}
                             remainingTime={timer}
                             isEnding={isEnding}
                />
            </div>

            <AfterGameLeaderboard setCodeDialogContent={() => {}} className={styles.playerList} />
        </div>
    )
}

export default PresentationTopic