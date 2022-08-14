import {FC, useContext, useEffect, useState} from 'react'
import {WSContext} from "../../common/context/WSContext"
import {GamePlayer} from "../../types/Player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser} from "@fortawesome/free-solid-svg-icons"
import styles from "./Leaderboard.module.scss"
import {Topic} from "../../types/Game";
import CountUp from "react-countup";

const _previousScoreComparator = (p1: GamePlayer, p2: GamePlayer) => {
    return p2.previousScore - p1.previousScore
}
const _scoreComparator = (p1: GamePlayer, p2: GamePlayer) => {
    return p2.score - p1.score
}

type LeaderboardProps = {}
const Leaderboard: FC<LeaderboardProps> = ({}: LeaderboardProps) => {
    const [ sortComparator, setSortComparator ] = useState(() => _previousScoreComparator)
    const {wsState: {game, players}} = useContext(WSContext)

    useEffect(() => {
        setTimeout(() => {
            setSortComparator(() => _scoreComparator)
        }, 2000)
    }, [])

    return (
        <div className={styles.container}>
            <h1>Leaderboard</h1>
            <ul className={styles.playerList}>
                {
                    players
                        .sort(sortComparator)
                        .map((player, index) => (
                            <li className={styles.player} key={`player-${player.name}`}>
                                <span className={styles.position}>{index + 1}</span>
                                <LeaderboardPlayerItem player={player} />
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

type LeaderboardPlayerItemProps = {
    player: GamePlayer,
}
const LeaderboardPlayerItem: FC<LeaderboardPlayerItemProps> = ({ player}) => {
    const topicScore = player.score - player.previousScore
    return (
        <div className={styles.playerResult}>
            <FontAwesomeIcon icon={faUser}/>
            <div className={styles.name}>{player.name}</div>
            { topicScore !== null ? <div className={styles.addedPoints}>+{topicScore}</div> : <></>}
            <div className={styles.score}>
                <CountUp start={player.previousScore} end={player.score} duration={1} />
            </div>
        </div>
    )
}

export default Leaderboard