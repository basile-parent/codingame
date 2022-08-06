import {FC} from 'react'

type GameActionsProps = {}
const GameActions: FC<GameActionsProps> = ({}: GameActionsProps) => {
    return (
        <aside>
            <button className={`button is-small is-primary`}>Start</button>
        </aside>
    )
}

export default GameActions