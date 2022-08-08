import {FC, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext"
import {Screen} from "../../../types/Screen"
import styles from "./GameActions.module.scss"

type GameActionsProps = {}
const GameActions: FC<GameActionsProps> = ({}: GameActionsProps) => {
    const { wsState: { screen, game }, dispatch } = useContext(WSContext)
    return (
        <aside className={styles.wrapper}>
            <button className={`button is-small is-primary`}
                    disabled={screen !== Screen.LANDING_PAGE}
                    onClick={() => dispatch({ type: "startGame" })}
            >
                Start
            </button>

            <button className={`button is-small is-primary`}
                    disabled={!game || screen !== Screen.GAME_EDITOR}
                    // onClick={() => dispatch({ type: "startGame" })}
            >
                Add time
            </button>
            <button className={`button is-small is-primary`}
                    disabled={!game || screen !== Screen.GAME_EDITOR || game.topic.isFinished}
                    // onClick={() => dispatch({ type: "startGame" })}
            >
                Finish topic
            </button>

        </aside>
    )
}

export default GameActions