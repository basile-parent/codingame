import {FC, useContext, useEffect, useState} from 'react'
import {WSContext} from "../../common/context/WSContext"
import {GamePlayer} from "../../types/Player"
import styles from "./Leaderboard.module.scss"
import LeaderboardPlayerItem from "./LeaderboardPlayerItem"
import FixFlipMove from "./FixFlipMove";

const _previousScoreComparator = (p1: GamePlayer, p2: GamePlayer) => {
    return p2.previousScore - p1.previousScore
}
const _scoreComparator = (p1: GamePlayer, p2: GamePlayer) => {
    return p2.score - p1.score
}

type LeaderboardProps = {}
const Leaderboard: FC<LeaderboardProps> = ({}: LeaderboardProps) => {
    const [ sortComparator, setSortComparator ] = useState(() => _previousScoreComparator)
    const [ animationEnded, setAnimationEnded ] = useState(false)
    const {wsState: {players}} = useContext(WSContext)

    useEffect(() => {
        setTimeout(() => {
            setAnimationEnded(true)
        }, 2000)
    }, [])
    useEffect(() => {
        animationEnded && setSortComparator(() => _scoreComparator)
    }, [ animationEnded ])

    // @ts-ignore
    return (
        <div className={styles.container}>
            <h1>Leaderboard</h1>
            <FixFlipMove className={styles.playerList}
                      staggerDurationBy="30"
                      duration={500}
                      typeName="ul"
                      enterAnimation="accordionVertical"
                      leaveAnimation="accordionVertical"
            >
            {
                players
                    .sort(sortComparator)
                    .map(player => (
                        <LeaderboardPlayerItem player={player}
                                               animationEnded={animationEnded}
                                               key={`player-${ player.uuid }`}
                        />
                    ))
            }
            </FixFlipMove>
        </div>
    )
}

export default Leaderboard