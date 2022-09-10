import {FC, useCallback, useState} from 'react'
import {faCheck, faTrash} from "@fortawesome/free-solid-svg-icons"
import ConnectedIcon from "../../../../common/components/ConnectedIcon"
import {GamePlayer} from "../../../../types/Player"
import {Topic} from "../../../../types/Game"
import TopicStatus from "./TopicStatus"
import styles from "./UserTable.module.scss"
import TopicHeaderCell from "./TopicHeaderCell"
import DetailModal from "./DetailModal"
import {IconButton} from "./UserTable"
import ModalConfirm from "../../../../common/components/ModalConfirm/ModalConfirm"
import WebsocketManager from "../../../../common/components/WebsocketManager"
import {useSelector} from "react-redux"
import {RootState} from "../../../../common/store"

type PlayerTableProps = {}

const PlayerTable: FC<PlayerTableProps> = ({}: PlayerTableProps) => {
    const [ modalTopic, setModalTopic ] = useState<Topic | null>(null)
    const game = useSelector((state: RootState) => state.game)
    const players = useSelector((state: RootState) => state.players)
    const handleDeletePlayer = useCallback((uuid: string) => {
            ModalConfirm.confirm({
                message: "Etes-vous sûr de vouloir supprimer cet utilisateur ? Toutes ses données seront effacées. Cette action est définitive.",
                onConfirm: () => WebsocketManager.deletePlayer(uuid)
            })
        }, []
    )
    const handleApprovePlayer = useCallback((uuid: string) => WebsocketManager.approvePlayer(uuid), [])

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
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    game &&
                    [ ...players ]
                        .sort(_usernameComparator)
                        .map((player) =>
                            <PlayerRow player={player}
                                       allTopics={game.allTopics}
                                       key={`player-${player.name}`}
                                       onDeletePlayer={handleDeletePlayer}
                                       onApprovePlayer={handleApprovePlayer}
                            />
                        )
                }

                {
                    !players?.length &&
                    <tr>
                        <td colSpan={4 + (game?.allTopics.length || 0)}>
                            Aucun joueur enregistré
                        </td>
                    </tr>
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

const _usernameComparator = (p1: GamePlayer, p2: GamePlayer) => {
    if (!p1.name) {
        return 1
    }
    if (!p2.name) {
        return -1
    }
    return p1.name.localeCompare(p2.name)
}

type PlayerRowProps = {
    player: GamePlayer,
    allTopics: Topic[],
    onDeletePlayer: (uuid: string) => void,
    onApprovePlayer: (uuid: string) => void,
}
const PlayerRow: FC<PlayerRowProps> = ({player, allTopics, onDeletePlayer, onApprovePlayer }) => {
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
            <td>
                <IconButton icon={faTrash}
                            title={"Supprimer ce joueur (toute sa progression sera supprimée)."}
                            onClick={() => onDeletePlayer(player.uuid)}
                            disabled={ player.connected }
                />

                { player.waitForApproval &&
                    <IconButton icon={faCheck}
                                title={"Approuver l'ajout du joueur à la partie"}
                                onClick={() => onApprovePlayer(player.uuid)}
                                disabled={ !player.connected }
                    />
                }
            </td>
        </tr>
    )
}

export default PlayerTable