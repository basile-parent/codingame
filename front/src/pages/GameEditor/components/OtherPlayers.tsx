import {FC} from 'react'
import styles from './OtherPlayers.module.scss'
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type OtherPlayersProps = {}
const OtherPlayers: FC<OtherPlayersProps> = ({}: OtherPlayersProps) => {
    return (
        <>
            <h2 className={styles.title}>
                <FontAwesomeIcon icon={faUsers} />
                Autres joueurs
            </h2>
            <ul>

            </ul>
        </>
    )
}

export default OtherPlayers