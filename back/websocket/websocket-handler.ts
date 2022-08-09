import {Socket} from "socket.io"
import Game from "./Game"
import UserHandler from "./UserHandler";
import WSStatus from "../types/WSStatus";

class WebSocketServerHandler {
    private GAME: Game
    private userHandler: UserHandler

    constructor() {
        this.GAME = new Game()
        this.userHandler = new UserHandler()
    }

    public connect(socket: Socket) {
        const user = this.userHandler.connectUser(socket)

        if (user.isAdmin()) {
            // socket.emit("leaderboard", this.userHandler.getAllPlayers())
            socket.emit("status", this.getStatus(true))
        } else {
            // socket.emit("leaderboard", this.userHandler.getLeaderboard())
            socket.emit("status", this.getStatus(false))
            this.userHandler.broadcastAdmin("leaderboard", this.userHandler.getAllPlayers())
        }

        this.logPlayers()

        socket.on("setName", this.setPlayerName)
        socket.on("disconnect", () => this.disconnectedUser(socket))
        socket.on("startGame", this.startGame)
        socket.on("resetGame", this.resetGame)
    }

    private disconnectedUser = (socket: Socket) => {
        this.userHandler.disconnectedUser(socket)

        this.broadcastLeaderboard()
        this.logPlayers()
    }

    private startGame = () => {
        this.GAME.startGame(this.userHandler.getLeaderboard(), () => this.broadcastStatus())
        console.log("Partie démarrée")
    }

    private resetGame = () => {
        this.GAME = new Game()
        this.broadcastStatus()
        console.log("Partie réinitialisée")
    }

    private setPlayerName = (uuid, name) => {
        this.userHandler.setPlayerName(uuid, name)

        this.logPlayers()
        this.broadcastLeaderboard()
    }

    private logPlayers = () => {
        console.debug(this.userHandler.toString())
    }

    private broadcastStatus = () => {
        this.userHandler.broadcastPlayers("status", this.getStatus(false))
        this.userHandler.broadcastAdmin("status", this.getStatus(true))
    }

    private getStatus = (isAdmin: boolean): WSStatus => {
        const status = {
            screen: this.GAME.screen,
            game: isAdmin ? this.GAME.toAdminJson() : this.GAME.toPublicJson(),
            players: isAdmin ? this.userHandler.getAllPlayers() : this.userHandler.getLeaderboard(),
            transitionTimeout: this.GAME.transitionTimeout
        }

        return status
    }

    private broadcastLeaderboard = () => {
        this.userHandler.broadcastPlayers("leaderboard", this.userHandler.getLeaderboard())
        this.userHandler.broadcastAdmin("leaderboard", this.userHandler.getAllPlayers())
    }

    private broadcast = (...args) => {
        this.userHandler.broadcast(...args)
    }

}

export default WebSocketServerHandler
