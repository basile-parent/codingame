import {FC, useContext} from 'react'
import {WSContext} from "../../common/context/WSContext"
import {GamePlayer} from "../../types/Player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser} from "@fortawesome/free-solid-svg-icons"
import styles from "./Leaderboard.module.scss"
import {Topic} from "../../types/Game";

const _scoreComparator = (p1: GamePlayer, p2: GamePlayer) => {
    return p2.score - p1.score
}

type LeaderboardProps = {}
const Leaderboard: FC<LeaderboardProps> = ({}: LeaderboardProps) => {
    const {wsState: {game, players}} = useContext(WSContext)

    return (
        <div className={styles.container}>
            <h1>Leaderboard</h1>
            <ul className={styles.playerList}>
                {
                    players
                        .sort(_scoreComparator)
                        .map((player, index) => (
                            <li className={styles.player} key={`player-${player.name}`}>
                                <span className={styles.position}>{index + 1}</span>
                                <LeaderboardPlayerItem player={player} currentTopic={game?.topic} />
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

type LeaderboardPlayerItemProps = {
    player: GamePlayer,
    currentTopic?: Topic | null
}
const LeaderboardPlayerItem: FC<LeaderboardPlayerItemProps> = ({ player, currentTopic}) => {
    const topicScore = currentTopic ? player.topics!.find(t => t.topicId === currentTopic.id)!.score : null
    return (
        <div className={styles.playerResult}>
            <FontAwesomeIcon icon={faUser}/>
            <div className={styles.name}>{player.name}</div>
            { topicScore !== null ? <div className={styles.addedPoints}>+{topicScore}</div> : <></>}
            <div className={styles.score}>{player.score}</div>
        </div>
    )
}

export default Leaderboard