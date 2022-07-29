import {FC} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece, faHourglass } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as AtecnaIcon } from "../../../assets/logo-cube.svg"
import styles from "./Header.module.scss"

type HeaderProps = {}
const Header: FC<HeaderProps> = ({}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <h1>
                <AtecnaIcon />
                Codingame Atecna
            </h1>
            <p className={ styles.gameMode }>
                <span className="icon">
                    <FontAwesomeIcon icon={faPuzzlePiece} />
                </span>
                Mode de jeu : Le + rapide
            </p>
            <p className={ styles.timer }>
                <span className="icon">
                  <FontAwesomeIcon icon={faHourglass} />
                </span>
                Timer:
                <time></time>
            </p>
        </header>
    )
}

export default Header