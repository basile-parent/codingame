import GameScreen from "./GameScreen"
import {GamePlayer} from "./GamePlayer"
import Player from "../model/Player"
import Game from "../websocket/Game"
import Admin from "../model/Admin";
import Presentation from "../model/Presentation";

type WSStatus = {
    screen: GameScreen,
    players: (Player | GamePlayer)[],
    admins?: Admin[],
    presentations?: Presentation[],
    game: Game | null,
    transitionTimeout: number
}

export default WSStatus