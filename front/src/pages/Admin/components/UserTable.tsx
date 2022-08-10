import {FC, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext"
import styles from "./UserTable.module.scss"
import ConnectedIcon from "../../../common/ConnectedIcon";
import {GamePlayer, GamePlayerStatus} from "../../../types/Player";
import {Topic} from "../../../types/Game";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faPen} from "@fortawesome/free-solid-svg-icons";

type UserTableProps = {}

const UserTable: FC<UserTableProps> = ({}: UserTableProps) => {
    const {wsState: {game, players}} = useContext(WSContext)

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
            <td className={styles.score}>
                {player.score}
            </td>
            {
                allTopics.map(topic =>
                    <TopicStatus player={player} topic={topic} key={`player-${player.uuid}-topic-${topic.id}`} />)
            }
            <td>
                {/*Actions*/}
            </td>
        </tr>
    )
}

type TopicStatusProps = {
    player: GamePlayer,
    topic: Topic
}
const TopicStatus: FC<TopicStatusProps> = ({ player, topic }) => {
    const playerTopic = player.topics?.find(t => t.topicId === topic.id)
    console.warn("TOPICS", player.topics)
    if (!playerTopic) {
        return (
            <td className={styles.scoreTopic}>
                /
            </td>
        )
    }
    return (
        <td className={styles.scoreTopic}>
            {
                playerTopic.status === GamePlayerStatus.IN_PROGRESS ?
                    <FontAwesomeIcon icon={faPen} /> :
                    playerTopic.status === GamePlayerStatus.FINISHED ?
                        playerTopic.score ?? <FontAwesomeIcon icon={faSpinner} />
                    : "/"
            }
        </td>
    )
}

export default UserTable