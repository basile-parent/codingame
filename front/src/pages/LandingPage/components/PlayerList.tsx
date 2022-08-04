import {FC, useContext} from 'react'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./PlayerList.module.scss";
import {WSContext} from "../../../common/context/WSContext";

type PlayerListProps = {}
const PlayerList: FC<PlayerListProps> = ({}: PlayerListProps) => {
    const {state} = useContext(WSContext);

    return (
        <div className={styles.waitingPlayerList}>
            {
                !state.players.length ?
                    <p>En attente de joueurs...</p>:
                    <ul>
                        {
                            state.players
                                .sort((p1, p2) => p1.name.localeCompare(p2.name))
                                .map(player => (
                                <li key={`player-${ player.name }`}>
                                    <FontAwesomeIcon icon={faUser} />
                                    { player.name }
                                </li>
                            ))
                        }
                    </ul>
            }
        </div>
    )
}

export default PlayerList