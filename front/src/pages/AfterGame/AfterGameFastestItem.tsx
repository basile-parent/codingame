import {FC} from 'react'
import playerUtils from "../../utils/playerUtils";
import styles from "./Aftergame.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faUser} from "@fortawesome/free-solid-svg-icons";
import {Game} from "../../types/Game";
import {GamePlayer, PlayerTopic} from "../../types/Player";

const _getPlayerTopic = (player: GamePlayer, game: Game): PlayerTopic => {
    return player.topics!.find(topic => topic.topicId === game.topic!.id)!;
}

type AfterGameFastestItemProps = {
    game: Game,
    player: GamePlayer
}
const AfterGameFastestItem: FC<AfterGameFastestItemProps> = ({ game, player }: AfterGameFastestItemProps) => {
    const playerTopic = _getPlayerTopic(player, game)
    const isLocalPlayer = player.uuid === playerUtils.getPlayerUuid()
    return (
        <div className={styles.playerResult}>
            <span className={styles.completion}>
                {
                    playerTopic.completion !== undefined && playerTopic.completion !== null ?
                        `${ Math.round(playerTopic.completion * 100) }%` :
                        isLocalPlayer ?
                            <FontAwesomeIcon icon={faSpinner} /> :
                            "N/A"
                }
            </span>
            <FontAwesomeIcon icon={faUser} className={`${isLocalPlayer && styles.localPlayer}`} />
            <div className={styles.info}>
                <div className={`${styles.name} ${isLocalPlayer && styles.localPlayer}`}>{ player.name }</div>
                <div className={styles.status}>{ playerUtils.translatePlayerTopicStatus(playerTopic.status) }</div>
            </div>
        </div>
    )
}

export default AfterGameFastestItem