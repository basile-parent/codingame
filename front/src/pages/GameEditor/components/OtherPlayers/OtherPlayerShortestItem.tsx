import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {GamePlayer, GamePlayerStatus, PlayerTopic} from "../../../../types/Player";
import styles from "./OtherPlayers.module.scss"

type OtherPlayerShortestItemProps = {
    player: GamePlayer,
    playerTopic: PlayerTopic
}
const OtherPlayerShortestItem: FC<OtherPlayerShortestItemProps> = ({ player, playerTopic }: OtherPlayerShortestItemProps) => {
    return (
        <div className={styles.player}>
            <span>
                <div className={styles.completion}>{ playerTopic.completion ? `${ Math.round(playerTopic.completion * 100) }%` : "N/A" }</div>
                <div className={styles.codeLength}>{ playerTopic.code ? `${ playerTopic.code.length } car.` : "" }</div>
            </span>
            <FontAwesomeIcon icon={faUser} />
            <div className={styles.info}>
                <div className={styles.name}>{ player.name }</div>
                <div className={styles.status}>{ translatePlayerStatus(playerTopic.status) }</div>
            </div>
        </div>
    )
}

export const translatePlayerStatus = (status: GamePlayerStatus): string =>
    status === GamePlayerStatus.FINISHED ? "Terminé": "En cours"

export default OtherPlayerShortestItem