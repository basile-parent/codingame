import {FC} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece, faHourglass } from '@fortawesome/free-solid-svg-icons'
import AtecnaIcon from "../../../assets/logo-cube.svg"

type HeaderProps = {}
const Header: FC<HeaderProps> = ({}: HeaderProps) => {
    return (
        <header>
            <h1>
                <AtecnaIcon />
                Codingame Atecna
            </h1>
            <p id="game-mode">
                    <span className="icon">
                        <FontAwesomeIcon icon={faPuzzlePiece} />
                      <i className="fa-solid fa-puzzle-piece"></i>
                    </span>
                Mode de jeu : Le + rapide
            </p>
            <p id="timer">
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