import {FC, useContext, useMemo} from 'react'
import styles from './OtherPlayers.module.scss'
import {faUsers} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import OtherPlayerFastestItem from "./OtherPlayerFastestItem"
import {WSContext} from "../../../../common/context/WSContext"
import {GamePlayer} from "../../../../types/Player"
import {Game, GameMode} from "../../../../types/Game"
import leaderboardUtils from "../../../../utils/leaderboardUtils"
import OtherPlayerShortestItem from "./OtherPlayerShortestItem";

type OtherPlayersProps = {}
const OtherPlayers: FC<OtherPlayersProps> = ({}: OtherPlayersProps) => {
    const {wsState: { game, players }} = useContext(WSContext)
    const comparator = useMemo(() => leaderboardUtils.getTopicPlayerDisplayProps(game!.topic!), [ game!.topic! ])

    return (
        <>
            <h2 className={styles.title}>
                <FontAwesomeIcon icon={faUsers}/>
                Joueurs
            </h2>
            <ul>
                {
                    players
                        .sort(comparator)
                        .map(player =>
                        <OtherPlayerItem player={player}
                                         game={game!}
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
    const ItemComponent = game!.topic!.gameMode === GameMode.SHORTEST ? OtherPlayerShortestItem : OtherPlayerFastestItem

    return (
        <li>
            <ItemComponent player={player} playerTopic={playerTopic!}/>
        </li>
    )
}

export default OtherPlayers