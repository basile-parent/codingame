import {FC, useContext} from 'react'
import {WSContext} from "../../common/context/WSContext"
import PlayerWithCompletion from "../GameEditor/components/OtherPlayers/PlayerWithCompletion"
import styles from "./Aftergame.module.scss"

type AfterGameProps = {}
const AfterGame: FC<AfterGameProps> = ({}: AfterGameProps) => {
    const { wsState: { game, players } } = useContext(WSContext)

    return (
        <div className={styles.wrapper}>
            <h1>{ game!.topic!.isFinished ? "Manche terminée" : "Vous avez validé votre code"}</h1>
            <h2>Résultats de la manche</h2>
            <ul className={styles.playerList}>
                {
                    players.map((player, index) => (
                        <li className={styles.player}>
                            <span className={styles.position}>{ index + 1}</span>
                            <PlayerWithCompletion player={player} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default AfterGame