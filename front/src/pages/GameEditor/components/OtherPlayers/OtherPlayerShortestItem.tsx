import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {GamePlayer, GamePlayerStatus, PlayerTopic} from "../../../../types/Player";
import styles from "./OtherPlayers.module.scss"
import dateUtils from "../../../../utils/dateUtils";

type OtherPlayerShortestItemProps = {
    player: GamePlayer,
    playerTopic: PlayerTopic
}
const OtherPlayerShortestItem: FC<OtherPlayerShortestItemProps> = ({ player, playerTopic }: OtherPlayerShortestItemProps) => {
    return (
        <div className={styles.player}>
            <div className={styles.completionContainer}>
                <span className={styles.completion}>
                    { playerTopic.completion ? `${ Math.round(playerTopic.completion * 100) }%` : "N/A" }
                </span>
                {
                    playerTopic.duration &&
                    <span className={styles.duration}>
                        { dateUtils.timeToString(Math.round(playerTopic.duration / 1000)) }
                    </span>
                }
            </div>
            <FontAwesomeIcon icon={faUser} />
            <div className={styles.info}>
                <div className={styles.name}>{ player.name }</div>
                <div className={styles.status}>{ translatePlayerStatus(playerTopic.status) }</div>
            </div>
            {
                playerTopic.codeLength &&
                <div className={styles.codeLength}>
                    {playerTopic.codeLength} car.
                </div>
            }
        </div>
    )
}

export const translatePlayerStatus = (status: GamePlayerStatus): string =>
    status === GamePlayerStatus.FINISHED ? "Terminé": "En cours"

export default OtherPlayerShortestItem