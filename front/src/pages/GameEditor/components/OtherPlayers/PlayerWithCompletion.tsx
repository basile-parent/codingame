import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {GamePlayer, GamePlayerStatus, PlayerTopic} from "../../../../types/Player";
import styles from "./OtherPlayers.module.scss"

type PlayerWithCompletionProps = {
    player: GamePlayer,
    playerTopic: PlayerTopic
}
const PlayerWithCompletion: FC<PlayerWithCompletionProps> = ({ player, playerTopic }: PlayerWithCompletionProps) => {
    return (
        <div className={styles.player}>
            <span className={styles.completion}>
                { playerTopic.completion ? `${ playerTopic.completion }%` : "N/A" }
            </span>
            <FontAwesomeIcon icon={faUser} />
            <div className={styles.info}>
                <div className={styles.name}>{ player.name }</div>
                <div className={styles.status}>{ translatePlayerStatus(playerTopic.status) }</div>
            </div>
        </div>
    )
}

const translatePlayerStatus = (status: GamePlayerStatus): string =>
    status === GamePlayerStatus.FINISHED ? "Terminé": "En cours"

export default PlayerWithCompletion