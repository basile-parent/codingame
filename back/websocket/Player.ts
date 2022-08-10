import {Socket} from "socket.io";
import {GamePlayer, PlayerTopic} from "../types/GamePlayer";
import User from "./User";
import GameScreen from "../types/GameScreen";

class Player implements User {
    public socket: Socket
    public uuid: string
    public name: string
    public screen: GameScreen
    public connected: boolean
    public score?: number
    public topics?: PlayerTopic[]

    constructor(socket: Socket, uuid: string, name?: string, connected?: boolean) {
        this.socket = socket
        this.uuid = uuid
        this.name = name
        this.connected = connected ?? true
        this.score = 0
        this.screen = GameScreen.LANDING_PAGE
    }

    public isAdmin(): boolean {
        return false
    }

    public toAdminPlayer(): Player {
        return {
            ...this,
            socket: undefined,
            toString: undefined,
        }
    }

    public toPublicPlayer(): GamePlayer {
        return {
            ...this,
            uuid: undefined,
            socket: undefined,
            connected: undefined,
            toString: undefined,
        }
    }

    public toString = (): string => {
        return this.name || this.uuid || "Unknown player"
    }
}

export default Player