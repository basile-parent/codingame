import io from "socket.io-client"
import {Socket} from "socket.io-client/build/esm/socket"
import {Dispatch} from "react"
import playerUtils from "../../utils/playerUtils"

class WebSocketHandler {
    public socket: Socket
    public dispatch: Dispatch<any>
    public isConnected: boolean

    constructor(url: string, dispatch: Dispatch<any>, path?: string) {
        this.isConnected = false
        this.socket = io(url, { path, reconnection: true })
        this.dispatch = dispatch

        this._initSocket()
    }

    _initSocket() {
        this.socket.on("connect", () => {
            this.isConnected = true

            this.setUuid()
            const userName = playerUtils.getPlayerName()
            if (userName) {
                this.setName(userName)
            }

            this.dispatch({type: "connected"})
        })
        this.socket.on("disconnect", () => {
            this.isConnected = false
            this.dispatch({type: "disconnected"})
        })
    }

    setUuid = () => {
        this._emit("setUuid", playerUtils.getPlayerUuid())
    }
    setName = (userName: string) => {
        this._emit("setName", playerUtils.getPlayerUuid(), userName)
    }

    // _on = (channel: string, cb: () => {}) => {
    //     this.socket.on(channel, cb)
    // }

    _emit = (channel: string, ...messages: any) => {
        console.debug("Emit message :", channel, ">", messages)
        if (!this.isConnected) {
            console.error("Cannot emit message : WebSocket is disconnected.")
            return false
        }
        this.socket.emit(channel, ...messages)
        return true
    }
}

export default WebSocketHandler