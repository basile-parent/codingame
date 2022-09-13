import {FC} from 'react'
import {useSelector} from "react-redux"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHourglass, faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as AtecnaIcon} from "../../../assets/logo-cube.svg"
import styles from "./Header.module.scss"
import gameModeUtils from "../../../utils/gameModeUtils"
import {RootState} from "../../../common/store"
import TopicTimer from "../../../common/components/TopicTimer"

type HeaderProps = {}
const Header: FC<HeaderProps> = ({}: HeaderProps) => {
    const game = useSelector((state: RootState) => state.game)

    return (
        <header className={styles.header}>
            <h1>
                <AtecnaIcon/>
                Codingame Atecna
            </h1>
            <p className={styles.gameMode}>
                <FontAwesomeIcon icon={faPuzzlePiece}/>
                Mode de jeu : &nbsp
                {
                    gameModeUtils.informations[game!.topic!.gameMode || ""]?.title || "???"
                }
            </p>
            <p className={styles.timer}>
                <FontAwesomeIcon icon={faHourglass}/>
                Timer: <TopicTimer />
            </p>
        </header>
    )
}

export default Header