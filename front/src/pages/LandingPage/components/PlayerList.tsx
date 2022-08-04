import {FC, useContext} from 'react'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./PlayerList.module.scss";
import {WSContext} from "../../../common/context/WSContext";
import playerUtils from "../../../utils/playerUtils";
import {GamePlayer} from "../../../types/Player";

type PlayerListProps = {
    onChangeName?: () => void
}
const PlayerList: FC<PlayerListProps> = ({ onChangeName }: PlayerListProps) => {
    const {wsState} = useContext(WSContext);

    return (
        <div className={styles.waitingPlayerList}>
            {
                !wsState.players.length ?
                    <p>En attente de joueurs...</p>:
                    <ul>
                        {
                            wsState.players
                                .sort((p1, p2) => p1.name.localeCompare(p2.name))
                                .map((player, index) => (
                                <Player key={`player-${ index }`} player={player} onChangeName={onChangeName} />
                            ))
                        }
                    </ul>
            }
        </div>
    )
}

type PlayerProps = {
    player: GamePlayer,
    onChangeName?: () => void
}
const Player: FC<PlayerProps> = ({ player, onChangeName }) => {
    if (player.name === playerUtils.getPlayerName()) {
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