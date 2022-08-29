import io from "socket.io-client"
import {Socket} from "socket.io-client/build/esm/socket"
import playerUtils from "../../../utils/playerUtils"
import {DisplayMode} from "../../../types/DisplayMode"
import {ReducerAction, WSAction} from "../../../types/Actions"
import WebsocketManager from "./WebsocketManager";

type WSOptions = {
    mode?: DisplayMode,
    path?: string
}
class WebSocketHandler {
    private socket: Socket
    private readonly onMessage: (action: ReducerAction) => void
    public isConnected: boolean
    private readonly mode: DisplayMode

    constructor(url: string, onMessage: (action: ReducerAction) => void, options?: WSOptions) {
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
        this.onMessage = onMessage

        this._initSocket()
    }

    _initSocket() {
        this.socket.on("connect", () => {})
        this.socket.on("confirmConnect", () => {
            this.isConnected = true
            this.onMessage(ReducerAction.USER_CONNECTED())
            const userName = playerUtils.getPlayerName()
            if (userName) {
                WebsocketManager.setName(userName)
            }
        })
        this.socket.on("disconnect", () => {
            this.isConnected = false
            this.onMessage(ReducerAction.USER_DISCONNECTED())
        })
        this.socket.on("leaderboard", (players) => {
            this.onMessage(ReducerAction.SET_PLAYERS(players))
        })
        this.socket.on("status", (wsStatus) => {
            this.onMessage(ReducerAction.STATUS(wsStatus))
        })
        this.socket.on("newEndTime", (endTimer: number) => {
            this.onMessage(ReducerAction.NEW_END_TIME(endTimer))
        })
    }

    // setName(action: Actions) {
    //     if (this.mode !== DisplayMode.PLAYER) {
    //         return
    //     }
    //     this._emit("setName", action)
    // }

    emit = (action: WSAction) => this._emit(action.type, action.payload)

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

    // close = () => {
    //     this.socket.close()
    // }
}

export default WebSocketHandler