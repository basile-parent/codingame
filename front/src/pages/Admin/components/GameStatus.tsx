import {FC, useCallback, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext"
import GameActions from "./GameActions"
import styles from "./GameStatus.module.scss"
import Timer from "../../../common/components/Timer";
import {TopicStatus, toTopicStatusLabel} from "../../../types/Game";

type GameStatusProps = {}
const GameStatus: FC<GameStatusProps> = ({}: GameStatusProps) => {
    const { wsState, dispatch } = useContext(WSContext)

    const handleEndTimer = useCallback(() => {
        if (!wsState.game || wsState.game.endTimer! < new Date().getTime()) {
            // Skip if timer is already done when moubnting the component
            return
        }
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
                                <li><label>Statut: </label> { toTopicStatusLabel(wsState.game.topic.status) }</li>
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