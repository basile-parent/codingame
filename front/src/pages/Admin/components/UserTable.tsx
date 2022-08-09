import {FC, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext"
import styles from "./UserTable.module.scss"
import ConnectedIcon from "../../../common/ConnectedIcon";
import {GamePlayer} from "../../../types/Player";
import {Game} from "../../../types/Game";

type UserTableProps = {}

const UserTable: FC<UserTableProps> = ({}: UserTableProps) => {
    const {wsState: {game, players}} = useContext(WSContext)

    console.warn("topics", game?.allTopics)

    return (
        <table className={`table ${styles.table}`}>
            <thead>
            <tr>
                <th>Joueur</th>
                <th>Total</th>
                {
                    game?.allTopics.map(topic =>
                        <th key={`topic-${topic.id}`}>#{topic.id}</th>
                    )
                }
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                game && players.map((player) =>
                    <UserRow player={player}
                             game={game}
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
    game: Game
}
const UserRow: FC<UserRowProps> = ({player, game}) => {
    return (
        <tr>
            <td className={styles.player}>
                <span className={styles.connectedIcon}>
                    <ConnectedIcon connected={player.connected}/>
                </span>
                {player.name || player.uuid}
            </td>
            <td className={styles.score}>
                {player.score}
            </td>
            {
                game?.allTopics.map(topic => {
                    const playerTopic = player.topics?.find(t => t.topicId === topic.id)
                    return (
                        <td key={`player-${player.uuid}-topic-${topic.id}`}
                            className={styles.scoreTopic}>
                            {playerTopic?.score || "/"}
                        </td>
                    )
                })
            }
            <td>

            </td>
        </tr>
    )
}

export default UserTable