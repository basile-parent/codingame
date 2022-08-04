import {GamePlayer} from "./GamePlayer";
import {Socket} from "socket.io";

export type WSPlayer = {
    socket: Socket,
    data: GamePlayer
}