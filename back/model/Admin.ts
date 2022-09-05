import {Socket} from "socket.io";
import User from "./User";

class Admin implements User {
    public socket: Socket
    public uuid: string
    public connected: boolean

    constructor(socket?: Socket, uuid?: string, connected?: boolean) {
        this.socket = socket
        this.uuid = uuid
        this.connected = connected ?? false
    }

    public static fromJson(json: object): Admin {
        const admin = new Admin()
        Object.assign(admin, json)

        return admin
    }

    public isAdmin(): boolean {
        return true
    }

    public toJson(): Admin {
        return {
            ...this,
            socket: undefined,
            connected: undefined,
        }
    }

    public toAdminUi(): Admin {
        return {
            ...this,
            socket: undefined,
        }
    }
}

export default Admin