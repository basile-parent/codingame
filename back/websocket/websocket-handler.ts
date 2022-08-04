import {GamePlayer, GamePlayerStatus} from "../types/GamePlayer"
import {WSPlayer} from "../types/WSPlayer"
import {Socket} from "socket.io"
import Game from "./Game"

class WebSocketServerHandler {
    private ADMINS: WSPlayer[] = []
    private PLAYERS: WSPlayer[] = []
    private GAME: Game

    constructor() {
        this.GAME = new Game()
    }

    public connect(socket: Socket) {
        const mode = socket.handshake.headers["x-mode"]
        const uuid = <string>socket.handshake.headers["x-uuid"]

        const existingAdminIndex = this.ADMINS.findIndex(a => a.data.uuid === uuid)
        if (existingAdminIndex >= 0) {
            this.ADMINS[existingAdminIndex].socket = socket
            return;
        }
        const existingPlayerIndex = this.PLAYERS.findIndex(a => a.data.uuid === uuid)
        if (existingPlayerIndex >= 0) {
            this.PLAYERS[existingPlayerIndex].socket = socket
            return;
        }

        if (mode === "ADMIN") {
            this.ADMINS.push({socket: socket, data: {uuid, status: GamePlayerStatus.WAITING}})
        } else {
            this.PLAYERS.push({socket: socket, data: {uuid, score: 0, status: GamePlayerStatus.WAITING}})
        }

        socket.emit('status', this.GAME.toJson())
        socket.emit('leaderboard', this.getLeaderboard())

        socket.on("setName", (uuid, name) => {
            this.setPlayerName(uuid, name)
        })

        socket.on('disconnect', () => {
                const index = this.PLAYERS.findIndex(p => p.socket === socket)
                if (index >= 0) {
                    const player = this.PLAYERS[index]
                    console.log(`${player.data.name || player.data.uuid || "Unknown player"} disconnected`)
                    this.PLAYERS = this.PLAYERS.filter(p => p.socket !== socket)
                } else {
                    const indexAdmin = this.ADMINS.findIndex(p => p.socket === socket)
                    if (indexAdmin >= 0) {
                        console.log("Admin disconnected")
                        this.ADMINS = this.ADMINS.filter(a => a.socket !== socket)
                    } else {
                        console.log("Unfound player disconnected")
                        return
                    }
                }

                this.broadcast('leaderboard', this.getLeaderboard())
                this.logPlayers()
            }
        )


        socket.on("startGame", this.startGame)
    }

    private startGame = () => {
        this.GAME.startGame(this.PLAYERS.map(this._mapPlayerForFront))
        this.broadcast('status', this.GAME.toJson())
        console.log("Partie démarrée")
    }

    private setPlayerName(uuid, name) {
        const index = this.PLAYERS.findIndex(p => p.data.uuid === uuid)
        const player = this.PLAYERS[index]
        player.data.name = name

        this.logPlayers()
        this.broadcast('leaderboard', this.getLeaderboard())
    }

    logPlayers() {
        const adminLabel = this.ADMINS.length > 0 ? `${this.ADMINS.length} admin${this.ADMINS.length > 1 ? "s" : ""}` : ""
        const playerLabel = this.PLAYERS.length > 0 ? `${this.PLAYERS.length} player${this.PLAYERS.length > 1 ? "s" : ""} : ${this.PLAYERS.map(u => u.data.name || u.data.uuid).join(", ") || "-"}` : ""
        const labels = [adminLabel, playerLabel].filter(label => label)
        if (labels.length) {
            console.debug(`There is ${labels.join(", ")}`)
        } else {
            console.debug("There is nobody")
        }
    }

    broadcast(...args) {
        // @ts-ignore
        this.ADMINS.forEach(a => a.socket.emit(...args))
        // @ts-ignore
        this.PLAYERS.forEach(p => p.socket.emit(...args))
    }

    getLeaderboard(): GamePlayer[] {
        return this.PLAYERS.filter(p => p.data.name).map(this._mapPlayerForFront)
    }

    private _mapPlayerForFront = player => ({...player.data, uuid: undefined})

}


// const sendMessageToUser = (login, topic, message) => {
//   const user = getUser(login)
//   if (user) {
//     console.debug(`Sending message to user [${ login }] on topic [${ topic }].`)
//     user.socket.emit(topic, message)
//   } else {
//     console.error(`Cannot send message to user [${ login }] : not connected to server.`)
//   }
// }

export default WebSocketServerHandler
