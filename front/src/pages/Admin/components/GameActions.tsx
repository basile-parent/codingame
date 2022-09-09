import {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {useSelector} from "react-redux"
import {Screen} from "../../../types/Screen"
import styles from "./GameActions.module.scss"
import ModalConfirm from "../../../common/components/ModalConfirm/ModalConfirm"
import {TopicStatus} from "../../../types/Game"
import WebsocketManager from "../../../common/components/WebsocketManager"
import {RootState} from "../../../common/store"

type GameActionsProps = {}
const GameActions: FC<GameActionsProps> = ({}: GameActionsProps) => {
    const screen = useSelector((state: RootState) => state.screen)
    const game = useSelector((state: RootState) => state.game)

    const handleTerminateTopic = useCallback(() => {
        ModalConfirm.confirm({
            message: "Etes-vous sûr de vouloir terminer l'exercice ?",
            onConfirm: WebsocketManager.finishTopic
        })
    }, [])
    const handleReset = useCallback(() => {
        ModalConfirm.confirm({
            message: "Etes-vous sûr de vouloir réinitialiser la partie ?",
            onConfirm: WebsocketManager.resetGame
        })
    }, [])

    return (
        <div className={styles.container}>
            <button className={`button is-small is-primary ${ styles.button }`}
                    disabled={game?.started}
                    onClick={WebsocketManager.startGame}
            >
                Démarrer
            </button>

            <button className={`button is-small is-danger ${ styles.button }`}
                    onClick={handleReset}
            >
                Réinit
            </button>

            <hr/>

            {
                game?.topic &&
                    <>
                      <AddTimeButton onAddTime={WebsocketManager.addTime} />
                      <button className={`button is-small is-primary ${ styles.button }`}
                              disabled={!game || screen !== Screen.GAME_EDITOR || game.topic.status === TopicStatus.FINISHED}
                              onClick={handleTerminateTopic}
                      >
                        Terminer topic
                      </button>
                      <button className={`button is-small is-primary ${ styles.button }`}
                              disabled={!game || screen !== Screen.AFTER_GAME || game.topic.status === TopicStatus.SCORE_CALCULATED }
                              onClick={WebsocketManager.calculateTopicScore}
                      >
                        Calcul score
                      </button>
                      <button className={`button is-small is-primary ${ styles.button }`}
                              disabled={!game || screen === Screen.LEADERBOARD || game.topic.status !== TopicStatus.SCORE_CALCULATED }
                              onClick={WebsocketManager.showScores}
                      >
                        Tableau score
                      </button>
                    </>
            }

            <button className={`button is-small is-warning ${ styles.button }`}
                    disabled={ game?.topic?.status === TopicStatus.IN_PROGRESS || screen === Screen.PODIUM }
                    onClick={WebsocketManager.showPodium}
            >
                Podium
            </button>

        </div>
    )
}

type AddTimeButtonProps = {
    onAddTime: (time: number) => void
}
const AddTimeButton: FC<AddTimeButtonProps> = ({ onAddTime }) => {
    const screen = useSelector((state: RootState) => state.screen)
    const game = useSelector((state: RootState) => state.game)
    const [ open, setOpen ] = useState(false)
    const [ customTime, setCustomTime ] = useState<number>(0)
    const disabled = useMemo(() => !game || screen !== Screen.GAME_EDITOR || game.topic?.status === TopicStatus.FINISHED, [game, screen])
    useEffect(() => {
        if (disabled) {
            setOpen(false)
        }
    }, [disabled])
    const handleAddTime = useCallback((time: number) => {
        onAddTime(time)
        setOpen(false)
    }, [])

    return (
        <>
            <div className={`dropdown is-right ${ open && "is-active" } ${ styles.buttonWithDropDown } ${ styles.addTimeDropDown }`}>
                <div className={`dropdown-trigger ${ styles.dropDownTrigger }`}>
                    <button className={`button is-small is-primary`}
                            disabled={disabled}
                            onClick={() => setOpen(o => !o)}
                    >
                        Ajouter du temps
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                    <div className={`dropdown-content ${ styles.dropDownContent}`}>
                        <div className="dropdown-item">
                            <input type="number"
                                   value={customTime}
                                   onChange={e => setCustomTime(parseInt(e.target.value))}
                                   placeholder="Temps"
                            />
                            sec.
                            <button onClick={() => handleAddTime(customTime)}>GO</button>
                        </div>
                        <hr className="dropdown-divider"/>
                        <button className="dropdown-item" onClick={() => handleAddTime(30)}>+30s</button>
                        <button className="dropdown-item" onClick={() => handleAddTime(60)}>+60s</button>
                        <button className="dropdown-item" onClick={() => handleAddTime(120)}>+2mn</button>
                        <button className="dropdown-item" onClick={() => handleAddTime(300)}>+5mn</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameActions