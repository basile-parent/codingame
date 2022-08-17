import {FC, SyntheticEvent, useCallback, useContext, useEffect, useState} from 'react'
import {WSContext} from "../../../../common/context/WSContext"
import ConnectedIcon from "../../../../common/components/ConnectedIcon"
import {GamePlayer} from "../../../../types/Player"
import {Topic} from "../../../../types/Game"
import TopicStatus from "./TopicStatus"
import styles from "./UserTable.module.scss"
import TopicHeaderCell from "./TopicHeaderCell";
import DetailModal from "./DetailModal";

type UserTableProps = {}

const UserTable: FC<UserTableProps> = ({}: UserTableProps) => {
    const [ modalTopic, setModalTopic ] = useState<Topic | null>(null)
    const {wsState: {game, players}} = useContext(WSContext)
    console.log("game", game)
    console.log("players", players)

    return (
        <>
            <table className={`table ${styles.table}`}>
                <thead>
                <tr>
                    <th>Joueur</th>
                    <th>Ecran</th>
                    <th>Total</th>
                    {
                        game?.allTopics.map(topic =>
                            <th key={`topic-${topic.id}`} className={styles.topicCell}>
                                <TopicHeaderCell topic={topic} onDetailTopic={setModalTopic} />
                            </th>
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {
                    game &&
                    players
                        .sort(_usernameComoarator)
                        .map((player) =>
                            <UserRow player={player}
                                     allTopics={game.allTopics}
                                     key={`player-${player.name}`}
                            />
                        )
                }
                </tbody>
            </table>

            {
                modalTopic &&
                <DetailModal topic={modalTopic} onClose={() => setModalTopic(null)} />
            }
        </>
    )
}

const _usernameComoarator = (p1: GamePlayer, p2: GamePlayer) => {
    if (!p1.name) {
        return 1
    }
    if (!p2.name) {
        return -1
    }
    return p1.name.localeCompare(p2.name)
}

type UserRowProps = {
    player: GamePlayer,
    allTopics: Topic[],
}
const UserRow: FC<UserRowProps> = ({player, allTopics}) => {
    return (
        <tr>
            <td className={styles.player}>
                <span className={styles.connectedIcon}>
                    <ConnectedIcon connected={player.connected}/>
                </span>
                {player.name || player.uuid}
            </td>
            <td>
                {player.screen}
            </td>
            <td className={styles.score}>
                {player.score}
            </td>
            {
                allTopics.map(topic =>
                    <TopicStatus player={player} topic={topic} key={`player-${player.uuid}-topic-${topic.id}`} />)
            }
        </tr>
    )
}

export default UserTable