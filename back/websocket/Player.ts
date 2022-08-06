import {Socket} from "socket.io";
import {GamePlayer, GamePlayerStatus} from "../types/GamePlayer";

class Player {
    public socket: Socket
    public uuid: string
    public name: string
    public connected: boolean
    public score?: number
    public completion?: number
    public status: GamePlayerStatus
    // TODO topic results

    constructor(socket: Socket, uuid: string, name?: string, connected?: boolean) {
        this.socket = socket
        this.uuid = uuid
        this.name = name
        this.connected = connected ?? true
    }

    public toPublicPlayer(): GamePlayer {
        return {
            name: this.name,
            score: this.score,
            completion: this.completion,
            status: this.status
        }
    }

    public toString = (): string => {
        return this.name || this.uuid || "Unknown player"
    }
}

export default Player