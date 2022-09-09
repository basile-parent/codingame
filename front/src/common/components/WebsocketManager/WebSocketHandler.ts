import io from "socket.io-client"
import {Socket} from "socket.io-client/build/esm/socket"
import playerUtils from "../../../utils/playerUtils"
import {DisplayMode} from "../../../types/DisplayMode"
import {WSAction} from "../../../types/Actions"
import WebsocketManager from "./WebsocketManager";
import {PayloadAction} from "@reduxjs/toolkit";
import {ReduxActions, RootState} from "../../store";
import {GamePlayer} from "../../../types/Player";

type WSOptions = {
    mode?: DisplayMode,
    path?: string,
    onConnect: () => void,
    onDisconnect: () => void,
    onSetPlayers: (players: GamePlayer[]) => void,
    onNewEndTime: (newEndTime: number) => void,
    onUpdate: (newStatus: RootState) => void,
}
class WebSocketHandler {
    private socket: Socket
    private readonly onConnect: () => void
    private readonly onDisconnect: () => void
    private readonly onSetPlayers: (players: GamePlayer[]) => void
    private readonly onNewEndTime: (newEndTime: number) => void
    private readonly onUpdate: (newStatus: RootState) => void
    public isConnected: boolean
    private readonly mode: DisplayMode

    constructor(url: string, options: WSOptions) {
        this.isConnected = false
        this.mode = options?.mode || DisplayMode.PLAYER

        console.log("Websocket. Connecting on ", url, options)
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
        this.onConnect = options.onConnect
        this.onDisconnect = options.onDisconnect
        this.onSetPlayers = options.onSetPlayers
        this.onNewEndTime = options.onNewEndTime
        this.onUpdate = options.onUpdate

        this._initSocket()
    }

    _initSocket() {
        this.socket.on("connect", () => {})
        this.socket.on("confirmConnect", () => {
            this._logMessage("confirmConnect")
            this.isConnected = true
            this.onConnect()
            const userName = playerUtils.getPlayerName()
            if (userName) {
                WebsocketManager.setName(userName)
            }
        })
        this.socket.on("disconnect", () => {
            this._logMessage("disconnect")
            this.isConnected = false
            this.onDisconnect()
        })
        this.socket.on("leaderboard", (players) => {
            this._logMessage("leaderboard", players)
            this.onSetPlayers(players)
        })
        this.socket.on("status", (wsStatus) => {
            this._logMessage("status", wsStatus)
            this.onUpdate(wsStatus)
        })
        this.socket.on("newEndTime", (endTimer: number) => {
            this._logMessage("newEndTime", endTimer)
            this.onNewEndTime(endTimer)
        })
    }

    _debugStyle = "color: grey"
    _logMessage = (messageId: string, payload?: any) => {
        console.debug(`%c< [MESSAGE] ${ messageId }`, this._debugStyle, payload)
    }

    emit = (action: WSAction) => this._emit(action.type, action.payload)

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