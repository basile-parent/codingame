import {FC, useCallback, useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import GameActions from "./GameActions"
import styles from "./GameStatus.module.scss"
import Timer from "../../../common/components/Timer"
import {toTopicStatusLabel} from "../../../types/Game"
import WebsocketManager from "../../../common/components/WebsocketManager"
import {RootState} from "../../../common/store"

type GameStatusProps = {}
const GameStatus: FC<GameStatusProps> = ({}: GameStatusProps) => {
    const screen = useSelector((state: RootState) => state.screen)
    const game = useSelector((state: RootState) => state.game)
    const transitionTimeout = useSelector((state: RootState) => state.transitionTimeout)
    const [ preventEndTimer, setPreventEndTimer ] = useState(false)

    useEffect(() => {
        console.debug("Check prevent endTimer", game?.endTimer, !game?.endTimer || game.endTimer! < new Date().getTime())
        setPreventEndTimer(!game?.endTimer || game.endTimer! < new Date().getTime())
    }, [ game?.endTimer ])

    const handleEndTimer = useCallback(() => {
        if (preventEndTimer) {
            // Skip if timer is already done when mounting the component
            console.debug("End timer prevented")
            return
        }
        WebsocketManager.finishTopic()
    }, [ preventEndTimer ])


    return (
        <article className={styles.wrapper}>
            <section className={styles.status}>
                <ul>
                    <li><label>Ecran: </label>{ screen }</li>
                    {
                        game?.topic && (
                            <>
                                <li><label>Exercice: </label> ({ game.topic.gameMode }) #{ game.topic.id }: { game.topic.summary }</li>
                                <li><label>Statut: </label> { toTopicStatusLabel(game.topic.status) }</li>
                                <li><label>Timer: </label><Timer endTimer={ game.endTimer! } onEndTimer={handleEndTimer} /></li>
                            </>
                        )
                    }
                    {
                        transitionTimeout > 0 && (
                            <>
                                <li><label>Countdown: </label><Timer endTimer={ new Date().getTime() + transitionTimeout } /></li>
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