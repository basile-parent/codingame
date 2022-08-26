import {forwardRef, useEffect, useState} from 'react'
import {GamePlayer} from "../../types/Player";
import styles from "./Leaderboard.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import playerUtils from "../../utils/playerUtils";

type LeaderboardPlayerItemProps = {
    player: GamePlayer,
    animationEnded: boolean,
}

const LeaderboardPlayerItem = forwardRef<HTMLLIElement, LeaderboardPlayerItemProps>(({ player, animationEnded }, ref) => {
    const topicScore = player.score - player.previousScore
    const isLocalPlayer = player.uuid === playerUtils.getPlayerUuid()
    return (
        <li className={styles.player} ref={ref}>
            <Position position={player.position!}
                      previousPosition={player.previousPosition}
                      animationEnded={animationEnded}
            />
            <div className={styles.playerResult}>
                <FontAwesomeIcon icon={faUser} className={`${isLocalPlayer && styles.localPlayer}`}/>
                <div className={`${styles.name} ${isLocalPlayer && styles.localPlayer}`}>{player.name}</div>
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

const Position = (props: { position: number, previousPosition?: number, animationEnded: boolean }) => {
    const { position, previousPosition , animationEnded } = props
    const displayedPosition = animationEnded ? position : previousPosition || position

    const additionalPositionClasses = []
    animationEnded && additionalPositionClasses.push(styles.highlightPosition)
    switch (displayedPosition) {
        case 1: additionalPositionClasses.push(styles.position1); break;
        case 2: additionalPositionClasses.push(styles.position2); break;
        case 3: additionalPositionClasses.push(styles.position3); break;
        default:
            break
    }

    return (
        <span className={`${styles.position} ${ additionalPositionClasses.join(" ") }`}>
            {displayedPosition}
        </span>
    )
}

export default LeaderboardPlayerItem