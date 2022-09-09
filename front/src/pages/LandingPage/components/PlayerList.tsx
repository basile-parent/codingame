import {FC} from 'react'
import {faUser} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import styles from "./PlayerList.module.scss"
import playerUtils from "../../../utils/playerUtils"
import {GamePlayer} from "../../../types/Player"
import {useSelector} from "react-redux"
import {RootState} from "../../../common/store"

type PlayerListProps = {
    onChangeName?: () => void
}

const PlayerList: FC<PlayerListProps> = ({ onChangeName }: PlayerListProps) => {
    const players = useSelector((state: RootState) => state.players)

    return (
        <div className={styles.waitingPlayerList}>
            {
                !players.length ?
                    <p>En attente de joueurs...</p>:
                    <ul>
                        {
                            [...players]
                                .sort(_nameComparator)
                                .map((player, index) => (
                                <Player key={`player-${ index }`} player={player} onChangeName={onChangeName} />
                            ))
                        }
                    </ul>
            }
        </div>
    )
}

const _nameComparator = (p1: GamePlayer, p2: GamePlayer) => p1.name.localeCompare(p2.name)

type PlayerProps = {
    player: GamePlayer,
    onChangeName?: () => void
}
const Player: FC<PlayerProps> = ({ player, onChangeName }) => {
    if (player.uuid === playerUtils.getPlayerUuid()) {
        return (
            <li>
                <button className={styles.changeNameButton} onClick={onChangeName}>
                    <FontAwesomeIcon icon={faUser} />
                    { player.name }
                </button>
            </li>
        )
    }

    return (
        <li>
            <FontAwesomeIcon icon={faUser} />
            { player.name }
        </li>
    )
}

export default PlayerList