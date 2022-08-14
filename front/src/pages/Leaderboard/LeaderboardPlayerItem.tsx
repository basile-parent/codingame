import {forwardRef} from 'react'
import {GamePlayer} from "../../types/Player";
import styles from "./Leaderboard.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";

type LeaderboardPlayerItemProps = {
    player: GamePlayer,
    index: number,
    animationEnded: boolean,
}
const LeaderboardPlayerItem = forwardRef<HTMLLIElement, LeaderboardPlayerItemProps>(({ player, index, animationEnded }, ref) => {
    const topicScore = player.score - player.previousScore
    return (
        <li className={styles.player} ref={ref}>
            <span className={styles.position}>{index + 1}</span>
            <div className={styles.playerResult}>
                <FontAwesomeIcon icon={faUser}/>
                <div className={styles.name}>{player.name}</div>
                {topicScore !== null ? <div className={styles.addedPoints}>+{topicScore}</div> : <></>}
                <div className={styles.score}>
                    <CountUp start={animationEnded ? player.score : player.previousScore}
                             end={player.score}
                             duration={1}
                    />
                </div>
            </div>
        </li>
    )
})

export default LeaderboardPlayerItem