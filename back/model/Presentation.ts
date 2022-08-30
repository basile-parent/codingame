import {Socket} from "socket.io";
import User from "./User";

class Presentation implements User {
    public socket: Socket
    public uuid: string
    public connected: boolean

    constructor(socket?: Socket, uuid?: string, connected?: boolean) {
        this.socket = socket
        this.uuid = uuid
        this.connected = connected ?? true
    }

    public static fromJson(json: object): Presentation {
        const presentation = new Presentation()
        Object.assign(presentation, json)

        return presentation
    }

    public isAdmin(): boolean {
        return true
    }

    public toJson(): Presentation {
        return {
            ...this,
            socket: undefined,
            connected: undefined,
        }
    }
}

export default Presentation