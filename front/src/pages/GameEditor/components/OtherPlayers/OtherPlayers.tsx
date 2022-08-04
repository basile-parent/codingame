import {FC, useContext} from 'react'
import styles from './OtherPlayers.module.scss'
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Player from "./Player";
import {WSContext} from "../../../../common/context/WSContext";

type OtherPlayersProps = {}
const OtherPlayers: FC<OtherPlayersProps> = ({}: OtherPlayersProps) => {
    const { wsState } = useContext(WSContext)

    return (
        <>
            <h2 className={styles.title}>
                <FontAwesomeIcon icon={faUsers} />
                Autres joueurs
            </h2>
            <ul>
                {
                    wsState.game?.players.map(player => (
                        <li key={`player-${ player.name}`} className={styles.player}>
                            <Player player={player} />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default OtherPlayers