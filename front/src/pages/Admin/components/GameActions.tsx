import {FC, useContext} from 'react'
import {WSContext} from "../../../common/context/WSContext";
import {Screen} from "../../../types/Screen";

type GameActionsProps = {}
const GameActions: FC<GameActionsProps> = ({}: GameActionsProps) => {
    const { wsState: { screen }, dispatch } = useContext(WSContext)
    return (
        <aside>
            <button className={`button is-small is-primary`}
                    disabled={screen !== Screen.LANDING_PAGE}
                    onClick={() => dispatch({ type: "startGame" })}
            >
                Start
            </button>
        </aside>
    )
}

export default GameActions