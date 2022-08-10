import {Socket} from "socket.io"
import Game from "./Game"
import UserHandler from "./UserHandler";
import WSStatus from "../types/WSStatus";
import Player from "./Player";

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
            socket.emit("status", this.getAdminStatus())
        } else {
            socket.emit("status", this.getPlayerStatus(user as Player))
            this.userHandler.broadcastAdmin("leaderboard", this.userHandler.getAllPlayers())
        }

        this.logPlayers()

        socket.on("setName", this.setPlayerName)
        socket.on("commitCode", this.setPlayerFinalCode)
        socket.on("tempCode", this.setPlayerTempCode)
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
        this.userHandler.setGameToPlayer(this.GAME)
        this.GAME.startGame()
        this.GAME.startTopic(this.GAME.allTopics[0].id, {
            updateCb: this.broadcastStatus,
            updateTopicCb: this.userHandler.updateTopicForAllPlayers,
            updatePropsCb: this.userHandler.updatePropsForAllPlayers
        })

        this.broadcastStatus()
        console.log("Partie démarrée")
    }

    private resetGame = () => {
        this.GAME = new Game()
        this.userHandler.resetGameOnPlayer()
        this.broadcastStatus()
        console.log("Partie réinitialisée")
    }

    private setPlayerName = (uuid, name) => {
        this.userHandler.setPlayerName(uuid, name)

        this.logPlayers()
        this.broadcastLeaderboard()
    }

    private setPlayerFinalCode = (uuid, code) => {
        this.userHandler.setPlayerFinalCode(uuid, code, this.GAME.topic)
        this.broadcastStatus()
    }

    private setPlayerTempCode = (uuid, code) => {
        this.userHandler.setPlayerTempCode(uuid, code, this.GAME.topic)
    }

    private logPlayers = () => {
        console.debug(this.userHandler.toString())
    }

    private broadcastStatus = () => {
        this.userHandler.broadcastEachPlayers("status", p => [ this.getPlayerStatus(p) ])
        this.userHandler.broadcastAdmin("status", this.getAdminStatus())
    }

    private getAdminStatus = (): WSStatus => {
        return {
            screen: this.GAME.currentScreen,
            game: this.GAME.toAdminJson(),
            players: this.userHandler.getAllPlayers(),
            transitionTimeout: this.GAME.transitionTimeout
        }
    }

    private getPlayerStatus = (player: Player): WSStatus => {
        return {
            screen: player.screen,
            game: this.GAME.toPublicJson(),
            players: this.userHandler.getLeaderboard(),
            transitionTimeout: this.GAME.transitionTimeout
        }
    }

    private broadcastLeaderboard = () => {
        this.userHandler.broadcastPlayers("leaderboard", this.userHandler.getLeaderboard())
        this.userHandler.broadcastAdmin("leaderboard", this.userHandler.getAllPlayers())
    }

    private broadcast = (topic, ...args) => {
        this.userHandler.broadcast(topic, ...args)
    }

}

export default WebSocketServerHandler
