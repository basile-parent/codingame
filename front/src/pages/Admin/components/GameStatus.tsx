import {FC, useCallback, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext"
import GameActions from "./GameActions"
import styles from "./GameStatus.module.scss"
import Timer from "../../../common/Timer";
import {TopicStatus} from "../../../types/Game";

type GameStatusProps = {}
const GameStatus: FC<GameStatusProps> = ({}: GameStatusProps) => {
    const { wsState, dispatch } = useContext(WSContext)

    console.log("GAME STATUS", wsState.game)
    const handleEndTimer = useCallback(() => {
        console.log("End timer => finishTopic")
        dispatch({ type: "finishTopic" })
    }, [])

    return (
        <article className={styles.wrapper}>
            <section className={styles.status}>
                <ul>
                    <li><label>Ecran: </label>{ wsState.screen }</li>
                    {
                        wsState.game?.topic && (
                            <>
                                <li><label>Exercice: </label> ({ wsState.game.topic.gameMode }) #{ wsState.game.topic.id }: { wsState.game.topic.summary }</li>
                                <li><label>Statut: </label> { wsState.game.topic.status !== TopicStatus.FINISHED ? "En cours": "Terminé" }</li>
                                <li><label>Timer: </label><Timer endTimer={ wsState.game.endTimer! } onEndTimer={handleEndTimer} /></li>
                            </>
                        )
                    }
                    {
                        wsState.transitionTimeout > 0 && (
                            <>
                                <li><label>Countdown: </label><Timer endTimer={ new Date().getTime() + wsState.transitionTimeout } /></li>
                            </>
                        )
                    }
                </ul>
            </section>
            <aside className={styles.actions}>
                <GameActions />
            </aside>
        </article>
    )
}

export default GameStatus