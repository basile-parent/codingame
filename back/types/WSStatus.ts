import GameScreen from "./GameScreen"
import {GamePlayer} from "./GamePlayer"
import Player from "../websocket/Player"
import Game from "../websocket/Game"

type WSStatus = {
    screen: GameScreen,
    players: (Player | GamePlayer)[],
    game: Game | null,
    transitionTimeout: number
}

export default WSStatus