import {FC, useContext} from 'react'
import styles from './OtherPlayers.module.scss'
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PlayerWithCompletion from "./PlayerWithCompletion";
import {WSContext} from "../../../../common/context/WSContext";

type OtherPlayersProps = {}
const OtherPlayers: FC<OtherPlayersProps> = ({}: OtherPlayersProps) => {
    const { wsState } = useContext(WSContext)

    return (
        <>
            <h2 className={styles.title}>
                <FontAwesomeIcon icon={faUsers} />
                Joueurs
            </h2>
            <ul>
                {
                    wsState.players.map(player => (
                        <li key={`player-${ player.name}`}>
                            <PlayerWithCompletion player={player} />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default OtherPlayers