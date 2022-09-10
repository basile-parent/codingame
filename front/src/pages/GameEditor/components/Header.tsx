import {FC, useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHourglass, faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as AtecnaIcon} from "../../../assets/logo-cube.svg"
import styles from "./Header.module.scss"
import Timer from "../../../common/components/Timer"
import gameModeUtils from "../../../utils/gameModeUtils"
import {RootState} from "../../../common/store"

type HeaderProps = {}
const Header: FC<HeaderProps> = ({}: HeaderProps) => {
    const game = useSelector((state: RootState) => state.game)
    
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
                Mode de jeu : &nbsp
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