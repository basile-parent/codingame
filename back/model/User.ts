import {Socket} from "socket.io";

interface User {
    socket: Socket
    uuid: string
    connected: boolean

    isAdmin(): boolean
}

export default User