import {FC, useCallback, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext"
import {Screen} from "../../../types/Screen"
import styles from "./GameActions.module.scss"
import ModalConfirm from "../../../common/ModalConfirm/ModalConfirm";

type GameActionsProps = {}
const GameActions: FC<GameActionsProps> = ({}: GameActionsProps) => {
    const { wsState: { screen, game }, dispatch } = useContext(WSContext)

    const handleReset = useCallback(() => {
        ModalConfirm.confirm({
            message: "Etes-vous sûr de vouloir réinitialiser la partie ?",
            onConfirm: () => dispatch({ type: "resetGame" })
        })
    }, [])

    return (
        <aside className={styles.container}>
            <button className={`button is-small is-primary`}
                    disabled={screen !== Screen.LANDING_PAGE}
                    onClick={() => dispatch({ type: "startGame" })}
            >
                Démarrer
            </button>

            <button className={`button is-small is-primary`}
                    disabled={!game || screen !== Screen.GAME_EDITOR || game.topic?.isFinished}
                    // onClick={() => dispatch({ type: "startGame" })}
            >
                Ajouter du temps
            </button>
            <button className={`button is-small is-primary`}
                    disabled={!game || screen !== Screen.GAME_EDITOR || game.topic?.isFinished}
                    // onClick={() => dispatch({ type: "startGame" })}
            >
                Terminer topic
            </button>
            <button className={`button is-small is-primary`}
                    disabled={!game || screen !== Screen.AFTER_GAME}
                    onClick={() => dispatch({ type: "calculateScore" })}
            >
                Calcul score
            </button>

            <button className={`button is-small is-danger`}
                    onClick={handleReset}
            >
                Réinit
            </button>

        </aside>
    )
}

export default GameActions