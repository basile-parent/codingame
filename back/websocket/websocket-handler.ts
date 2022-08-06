import {Socket} from "socket.io"
import Game from "./Game"
import UserHandler from "./UserHandler";

class WebSocketServerHandler {
    private GAME: Game
    private userHandler: UserHandler

    constructor() {
        this.GAME = new Game()
        this.userHandler = new UserHandler()
    }

    public connect(socket: Socket) {
        const user = this.userHandler.connectUser(socket)
        socket.emit("status", this.GAME.toJson())

        if (user.isAdmin()) {
            socket.emit("leaderboard", this.userHandler.getAllPlayers())
        } else {
            socket.emit("leaderboard", this.userHandler.getLeaderboard())
        }

        socket.on("setName", this.setPlayerName)
        socket.on("disconnect", () => this.disconnectedUser(socket))
        socket.on("startGame", this.startGame)
    }

    private disconnectedUser = (socket: Socket) => {
        this.userHandler.disconnectedUser(socket)

        this.broadcast("leaderboard", this.userHandler.getLeaderboard())
        this.logPlayers()
    }

    private startGame = () => {
        this.GAME.startGame()
        this.broadcast("status", this.GAME.toJson())
        console.log("Partie démarrée")
    }

    private setPlayerName = (uuid, name) => {
        this.userHandler.setPlayerName(uuid, name)

        this.logPlayers()
        this.broadcast("leaderboard", this.userHandler.getLeaderboard())
    }

    private logPlayers = () => {
        console.debug(this.userHandler.toString())
    }

    private broadcast = (...args) => {
        this.userHandler.broadcast(...args)
    }

}

export default WebSocketServerHandler
