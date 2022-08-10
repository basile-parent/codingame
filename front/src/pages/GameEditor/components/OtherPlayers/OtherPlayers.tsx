import {FC, useContext} from 'react'
import styles from './OtherPlayers.module.scss'
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PlayerWithCompletion from "./PlayerWithCompletion";
import {WSContext} from "../../../../common/context/WSContext";
import {GamePlayer} from "../../../../types/Player";
import {Game} from "../../../../types/Game";

type OtherPlayersProps = {}
const OtherPlayers: FC<OtherPlayersProps> = ({}: OtherPlayersProps) => {
    const {wsState} = useContext(WSContext)

    return (
        <>
            <h2 className={styles.title}>
                <FontAwesomeIcon icon={faUsers}/>
                Joueurs
            </h2>
            <ul>
                {
                    wsState.players.map(player =>
                        <OtherPlayerItem player={player}
                                         game={wsState.game!}
                                         key={`player-${player.name}`}
                        />
                    )
                }
            </ul>
        </>
    )
}

type OtherPlayerItemProps = {
    game: Game,
    player: GamePlayer
}
const OtherPlayerItem: FC<OtherPlayerItemProps> = ({game, player}) => {
    const playerTopic = player.topics!.find(topic => topic.topicId === game.topic!.id)
    return (
        <li>
            <PlayerWithCompletion player={player} playerTopic={playerTopic!}/>
        </li>
    )
}

export default OtherPlayers