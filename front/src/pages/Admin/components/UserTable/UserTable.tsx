import {FC, useContext} from 'react'
import {WSContext} from "../../../../common/context/WSContext"
import ConnectedIcon from "../../../../common/ConnectedIcon"
import {GamePlayer} from "../../../../types/Player"
import {Topic} from "../../../../types/Game"
import TopicStatus from "./TopicStatus"
import styles from "./UserTable.module.scss"

type UserTableProps = {}

const UserTable: FC<UserTableProps> = ({}: UserTableProps) => {
    const {wsState: {game, players}} = useContext(WSContext)

    return (
        <table className={`table ${styles.table}`}>
            <thead>
            <tr>
                <th>Joueur</th>
                <th>Ecran</th>
                <th>Total</th>
                {
                    game?.allTopics.map(topic =>
                        <th key={`topic-${topic.id}`}>#{topic.id}</th>
                    )
                }
            </tr>
            </thead>
            <tbody>
            {
                game && players.map((player) =>
                    <UserRow player={player}
                             allTopics={game.allTopics}
                             key={`player-${player.name}`}
                    />
                )
            }
            </tbody>
        </table>
    )
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