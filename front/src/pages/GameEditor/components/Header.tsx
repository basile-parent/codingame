import {FC, useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHourglass, faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as AtecnaIcon} from "../../../assets/logo-cube.svg"
import styles from "./Header.module.scss"
import {WSContext} from "../../../common/context/WSContext";
import Timer from "../../../common/Timer";
import gameModeUtils from "../../../utils/gameModeUtils";

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
                    gameModeUtils.informations[wsState.game?.topic.gameMode || ""]?.title || "???"
                }
            </p>
            <p className={styles.timer}>
                <FontAwesomeIcon icon={faHourglass}/>
                Timer: <Timer endTimer={wsState.game?.endTimer ? wsState.game.endTimer + 2000 : undefined} />
            </p>
        </header>
    )
}

export default Header