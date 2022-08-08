import {FC, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext"
import GameActions from "./GameActions"
import styles from "./GameStatus.module.scss"
import Timer from "../../../common/Timer";

type GameStatusProps = {}
const GameStatus: FC<GameStatusProps> = ({}: GameStatusProps) => {
    const { wsState } = useContext(WSContext)
    console.log(wsState)

    return (
        <article className={styles.wrapper}>
            <section className={styles.status}>
                <ul>
                    <li><label>Ecran: </label>{ wsState.screen }</li>
                    {
                        wsState.game?.topic && (
                            <>
                                <li><label>Exercice: </label> ({ wsState.game.topic.gameMode }) #{ wsState.game.topic.id }: { wsState.game.topic.summary }</li>
                                <li><label>Statut: </label> { !wsState.game.topic.isFinished ? "En cours": "Terminé" }</li>
                                <li><label>Timer: </label><Timer endTimer={ wsState.game.endTimer } /></li>
                            </>
                        )
                    }
                </ul>
            </section>
            <section className={styles.actions}>
                <GameActions />
            </section>
        </article>
    )
}

export default GameStatus