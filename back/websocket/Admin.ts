import {Socket} from "socket.io";

class Admin {
    public socket: Socket
    public uuid: string
    public connected: boolean

    constructor(socket: Socket, uuid: string, connected?: boolean) {
        this.socket = socket
        this.uuid = uuid
        this.connected = connected ?? true
    }
}

export default Admin