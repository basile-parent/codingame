import {FC, useContext} from 'react'
import {WSContext} from "../../common/context/WSContext"
import PlayerWithCompletion from "../GameEditor/components/OtherPlayers/PlayerWithCompletion"
import styles from "./Aftergame.module.scss"
import {Game} from "../../types/Game";
import {GamePlayer} from "../../types/Player";

type AfterGameProps = {}
const AfterGame: FC<AfterGameProps> = ({}: AfterGameProps) => {
    const {wsState: {game, players}} = useContext(WSContext)

    return (
        <div className={styles.wrapper}>
            <h1>{game!.topic!.isFinished ? "Manche terminée" : "Vous avez validé votre code"}</h1>
            <h2>Résultats de la manche</h2>
            <ul className={styles.playerList}>
                {
                    players.map((player, index) => (
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
const AfterGamePlayerItem: FC<AfterGamePlayerItemProps> = ({game, player}) => {
    const playerTopic = player.topics!.find(topic => topic.topicId === game.topic!.id)
    return (
        <PlayerWithCompletion player={player} playerTopic={playerTopic!}/>
    )
}

export default AfterGame