import {FC, useContext, useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHourglass, faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as AtecnaIcon} from "../../../assets/logo-cube.svg"
import styles from "./Header.module.scss"
import {WSContext} from "../../../common/context/WSContext";
import Timer from "../../../common/components/Timer";
import gameModeUtils from "../../../utils/gameModeUtils";

type HeaderProps = {}
const Header: FC<HeaderProps> = ({}: HeaderProps) => {
    const {wsState: { game }} = useContext(WSContext)
    const [ endTimer, setEndTimer ] = useState<number>(game!.endTimer!)

    useEffect(() => {
        setEndTimer(game!.endTimer!)
    }, [ game!.endTimer ])

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
                    gameModeUtils.informations[game!.topic!.gameMode || ""]?.title || "???"
                }
            </p>
            <p className={styles.timer}>
                <FontAwesomeIcon icon={faHourglass}/>
                Timer: <Timer endTimer={endTimer} />
            </p>
        </header>
    )
}

export default Header