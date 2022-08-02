import {FC} from 'react'
import styles from './OtherPlayers.module.scss'
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {GamePlayer, GamePlayerStatus} from "../../../../types/Player";
import Player from "./Player";

type OtherPlayersProps = {}
const OtherPlayers: FC<OtherPlayersProps> = ({}: OtherPlayersProps) => {
    const players: GamePlayer[] = [
        { pseudo: "Toto", completion: null, status: GamePlayerStatus.IN_PROGRESS },
        { pseudo: "Titi", completion: null, status: GamePlayerStatus.IN_PROGRESS },
        { pseudo: "Tata Tata Tata Tata Tata ", completion: null, status: GamePlayerStatus.IN_PROGRESS },
        { pseudo: "Tete", completion: 50, status: GamePlayerStatus.FINISHED },
        { pseudo: "Tutu", completion: 100, status: GamePlayerStatus.FINISHED },
    ]

    return (
        <>
            <h2 className={styles.title}>
                <FontAwesomeIcon icon={faUsers} />
                Autres joueurs
            </h2>
            <ul>
                {
                    players.map(player => (
                        <li key={`player-${ player.pseudo}`} className={styles.player}>
                            <Player player={player} />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default OtherPlayers