import {Socket} from "socket.io";
import User from "./User";

class Admin implements User {
    public socket: Socket
    public uuid: string
    public connected: boolean

    constructor(socket: Socket, uuid: string, connected?: boolean) {
        this.socket = socket
        this.uuid = uuid
        this.connected = connected ?? true
    }

    public isAdmin(): boolean {
        return true
    }

}

export default Admin