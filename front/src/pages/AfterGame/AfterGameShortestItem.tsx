import {FC} from 'react'
import {useSelector} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSpinner, faUser} from "@fortawesome/free-solid-svg-icons"
import playerUtils from "../../utils/playerUtils"
import styles from "./Aftergame.module.scss"
import {Game} from "../../types/Game"
import {GamePlayer, PlayerTopic} from "../../types/Player"
import dateUtils from "../../utils/dateUtils"
import {DisplayMode} from "../../types/DisplayMode"
import WebsocketManager from "../../common/components/WebsocketManager"
import {RootState} from "../../common/store"

const _getPlayerTopic = (player: GamePlayer, game: Game): PlayerTopic => {
    return player.topics!.find(topic => topic.topicId === game.topic!.id)!
}

type AfterGameShortestItemProps = {
    player: GamePlayer,
    onOpenCodeDialog: (code: string) => void,
}
const AfterGameShortestItem: FC<AfterGameShortestItemProps> = ({ player, onOpenCodeDialog }: AfterGameShortestItemProps) => {
    const game = useSelector((state: RootState) => state.game)
    const mode = useSelector((state: RootState) => state.mode)
    const playerTopic = _getPlayerTopic(player, game!)
    const isLocalPlayer = player.uuid === playerUtils.getPlayerUuid()

    return (
        <div className={styles.playerResult}>
            <div className={styles.completionContainer}>
                <span className={styles.completion}>
                    {
                        playerTopic.completion !== undefined && playerTopic.completion !== null ?
                            `${ Math.round(playerTopic.completion * 100) }%` :
                            isLocalPlayer ?
                                <FontAwesomeIcon icon={faSpinner} /> :
                                "N/A"
                    }
                </span>
                {
                    playerTopic.duration &&
                    <span className={styles.duration}>
                        { dateUtils.timeToString(Math.round(playerTopic.duration / 1000)) }
                    </span>
                }
            </div>
            <FontAwesomeIcon icon={faUser} className={`${isLocalPlayer && styles.localPlayer}`} />
            <div className={styles.info}>
                <div className={`${styles.name} ${isLocalPlayer && styles.localPlayer}`}>{ player.name }</div>
                <div className={styles.status}>{ playerUtils.translatePlayerTopicStatus(playerTopic.status) }</div>
            </div>

            {
                !playerTopic.code && isLocalPlayer &&
                <button className={"button is-info"} onClick={WebsocketManager.shareCode}>Partager votre code</button>
            }
            {
                playerTopic.code && mode === DisplayMode.PLAYER &&
                <button className={"button is-info is-light"}
                        onClick={() => onOpenCodeDialog(playerTopic.code!)}
                >
                  Voir le code
                </button>
            }

            {
                playerTopic.codeLength &&
                <div className={styles.codeLength}>
                  <span className={styles.codeLengthValue}>{ playerTopic.codeLength }</span>
                  <span className={styles.codeLengthLabel}>car.</span>
                </div>
            }
        </div>
    )
}

export default AfterGameShortestItem