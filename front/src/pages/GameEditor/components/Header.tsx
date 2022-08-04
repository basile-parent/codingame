import {FC, useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHourglass, faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as AtecnaIcon} from "../../../assets/logo-cube.svg"
import styles from "./Header.module.scss"
import {WSContext} from "../../../common/context/WSContext";
import {GameMode} from "../../../types/Game";
import Timer from "../../../common/Timer";

type HeaderProps = {}
const Header: FC<HeaderProps> = ({}: HeaderProps) => {
    const {wsState} = useContext(WSContext)

    return (
        <header className={styles.header}>
            <h1>
                <AtecnaIcon/>
                Codingame Atecna
            </h1>
            <p className={styles.gameMode}>
                <FontAwesomeIcon icon={faPuzzlePiece}/>
                Mode de jeu : &nbsp;
                {
                    wsState.game?.topic.gameMode === GameMode.FASTEST ? "Le + rapide" :
                        wsState.game?.topic.gameMode === GameMode.SHORTEST ? "Le + court" :
                            "???"
                }
            </p>
            <p className={styles.timer}>
                <FontAwesomeIcon icon={faHourglass}/>
                Timer: <Timer />
            </p>
        </header>
    )
}

export default Header