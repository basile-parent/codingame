import {Dispatch} from "react"
import io from "socket.io-client"
import {Socket} from "socket.io-client/build/esm/socket"
import playerUtils from "../../utils/playerUtils"
import {DisplayMode} from "../../types/DisplayMode"

type WSOptions = {
    mode?: DisplayMode,
    path?: string
}
class WebSocketHandler {
    public socket: Socket
    public dispatch: Dispatch<any>
    public isConnected: boolean
    public mode: DisplayMode

    constructor(url: string, dispatch: Dispatch<any>, options?: WSOptions) {
        this.isConnected = false
        this.mode = options?.mode || DisplayMode.PLAYER
        this.socket = io(url,
            {
                path: options?.path,
                reconnection: true,
                reconnectionDelay: 500,
                extraHeaders: {
                    "X-mode": this.mode,
                    "X-UUID": playerUtils.getPlayerUuid()
                }
            })
        this.dispatch = dispatch

        this._initSocket()
    }

    _initSocket() {
        this.socket.on("connect", () => {
        })
        this.socket.on("confirmConnect", () => {
            this.isConnected = true
            this.dispatch({type: "connected"})
            const userName = playerUtils.getPlayerName()
            if (userName) {
                this.setName(userName)
            }
        })
        this.socket.on("disconnect", () => {
            this.isConnected = false
            this.dispatch({type: "disconnected"})
        })
        this.socket.on("leaderboard", (players) => {
            this.dispatch({type: "setPlayers", payload: players})
        })
        this.socket.on("status", (wsStatus) => {
            this.dispatch({type: "status", payload: wsStatus})
        })
        this.socket.on("newEndTime", (endTimer: number) => {
            this.dispatch({type: "newEndTime", payload: endTimer })
        })
    }

    setName(userName: string) {
        if (this.mode !== DisplayMode.PLAYER) {
            return
        }
        this._emit("setName", playerUtils.getPlayerUuid(), userName)
    }

    startGame = () => this._emit("startGame")
    startTopic = (topicId: number) => this._emit("startTopic", topicId)
    addTime = (time: number) => this._emit("addTime", time)
    reinitTopic = (topicId: number) => this._emit("reinitTopic", topicId)
    finishTopic = () => this._emit("finishTopic")
    calculateScore = () => this._emit("calculateTopicScore")
    showScores = () => this._emit("showScores")
    showPodium = () => this._emit("showPodium")
    resetGame = () => this._emit("resetGame")
    commitCode = (code: string) => this._emit("commitCode", playerUtils.getPlayerUuid(), code)
    saveTempCode = (code: string) => this._emit("tempCode", playerUtils.getPlayerUuid(), code)
    shareCode = () => this._emit("shareCode", playerUtils.getPlayerUuid())

    // _on = (channel: string, cb: () => {}) => {
    //     this.socket.on(channel, cb)
    // }

    _emit(channel: string, ...messages: any) {
        console.warn("Emit message :", channel, ">", messages)
        if (!this.isConnected) {
            console.error("Cannot emit message : WebSocket is disconnected.")
            return false
        }
        this.socket.emit(channel, ...messages)
        return true
    }

    close = () => {
        this.socket.close()
    }
}

export default WebSocketHandler