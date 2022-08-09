import {FC} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {GamePlayer, GamePlayerStatus} from "../../../../types/Player";
import styles from "./OtherPlayers.module.scss"

type PlayerWithCompletionProps = {
    player: GamePlayer
}
const PlayerWithCompletion: FC<PlayerWithCompletionProps> = ({ player }: PlayerWithCompletionProps) => {
    return (
        <div className={styles.player}>
            <span className={styles.completion}>
                { player.completion ? `${ player.completion }%` : "N/A" }
            </span>
            <FontAwesomeIcon icon={faUser} />
            <div className={styles.info}>
                <div className={styles.name}>{ player.name }</div>
                <div className={styles.status}>{ translatePlayerStatus(player.status) }</div>
            </div>
        </div>
    )
}

const translatePlayerStatus = (status: GamePlayerStatus): string =>
    status === GamePlayerStatus.FINISHED ? "Terminé": "En cours"

export default PlayerWithCompletion