import io from "socket.io-client"
import {Socket} from "socket.io-client/build/esm/socket";
import {Dispatch} from "react";

class WebSocketHandler {
    public socket: Socket
    public dispatch: Dispatch<any>

    constructor(url: string, dispatch: Dispatch<any>, path?: string) {
        this.socket = io(url, { path, reconnection: true })
        this.dispatch = dispatch

        this._initSocket()
    }

    _initSocket() {
        this.socket.on("connect", () => {
            console.log("CONNECTED !!!")
            this.dispatch({type: "connected"});
        })
        this.socket.on("disconnect", () => this.dispatch({ type: "disconnected" }))
    }
}

export default WebSocketHandler