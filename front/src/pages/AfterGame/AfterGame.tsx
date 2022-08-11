import {FC, useContext} from 'react'
import {WSContext} from "../../common/context/WSContext"
import {translatePlayerStatus} from "../GameEditor/components/OtherPlayers/PlayerWithCompletion"
import styles from "./Aftergame.module.scss"
import {Game} from "../../types/Game";
import {GamePlayer, PlayerTopic} from "../../types/Player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faUser} from "@fortawesome/free-solid-svg-icons";
import playerUtils from "../../utils/playerUtils";

type AfterGameProps = {}
const AfterGame: FC<AfterGameProps> = ({}: AfterGameProps) => {
    const {wsState: {game, players}} = useContext(WSContext)

    return (
        <div className={styles.wrapper}>
            <h1>{game!.topic!.isFinished ? "Manche terminée" : "Vous avez validé votre code"}</h1>
            <h2>Résultats de la manche</h2>
            <ul className={styles.playerList}>
                {
                    players
                        .sort(_completionComparator(game!))
                        .map((player, index) => (
                        <li className={styles.player} key={`player-${player.name}`}>
                            <span className={styles.position}>{index + 1}</span>
                            <AfterGamePlayerItem player={player} game={game!} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

type AfterGamePlayerItemProps = {
    game: Game,
    player: GamePlayer
}

const _completionComparator = (game: Game) => (p1: GamePlayer, p2: GamePlayer): number => {
    const playerTopic1 = _getPlayerTopic(p1, game)
    const playerTopic2 = _getPlayerTopic(p2, game)

    const diffCompletion = (playerTopic1.completion ?? -1) - (playerTopic2.completion ?? -1)
    return diffCompletion !== 0 ? diffCompletion * -1 : (playerTopic1.duration ?? -1) - (playerTopic2.duration ?? -1)
}

const _getPlayerTopic = (player: GamePlayer, game: Game): PlayerTopic => {
    return player.topics!.find(topic => topic.topicId === game.topic!.id)!;
}

const AfterGamePlayerItem: FC<AfterGamePlayerItemProps> = ({game, player}) => {
    const playerTopic = _getPlayerTopic(player, game);
    const isLocalPlayer = player.uuid === playerUtils.getPlayerUuid()
    return (
        <div className={styles.playerResult}>
            <span className={styles.completion}>
                {
                    playerTopic.completion !== undefined ?
                        `${ Math.round(playerTopic.completion * 100) }%` :
                        isLocalPlayer ?
                            <FontAwesomeIcon icon={faSpinner} /> :
                            "N/A"
                }
            </span>
            <FontAwesomeIcon icon={faUser} />
            <div className={styles.info}>
                <div className={styles.name}>{ player.name }</div>
                <div className={styles.status}>{ translatePlayerStatus(playerTopic.status) }</div>
            </div>
        </div>
    )
}

export default AfterGame