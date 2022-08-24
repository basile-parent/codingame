import {Socket} from "socket.io"
import Game from "./Game"
import UserHandler from "./UserHandler";
import WSStatus from "../types/WSStatus";
import Player from "../model/Player";
import {PlayerTopic} from "../types/GamePlayer";
import Topic from "../types/Topic";

class WebSocketServerHandler {
    private GAME: Game
    private userHandler: UserHandler

    constructor() {
        this.GAME = new Game()
        this.userHandler = new UserHandler()
    }

    public connect(socket: Socket) {
        let user
        try {
            user = this.userHandler.connectUser(socket, this.GAME.started)
        } catch(e) {
            console.error(e.message)
            return
        }

        socket.emit("confirmConnect")

        if (user.isAdmin()) {
            socket.emit("status", this.getAdminStatus())
        } else {
            socket.emit("status", this.getPlayerStatus(user as Player))
            this.userHandler.broadcastAdmin("leaderboard", this.userHandler.getAllPlayers())
        }

        this.logPlayers()

        socket.on("setName", this.setPlayerName)
        socket.on("tempCode", this.saveTempCode)
        socket.on("commitCode", this.submitCode)
        socket.on("shareCode", this.shareCode)
        socket.on("calculateTopicScore", this.calculateScores)
        socket.on("showScores", this.showScores)
        socket.on("disconnect", () => this.disconnectedUser(socket))
        socket.on("startGame", this.startGame)
        socket.on("startTopic", this.startTopic)
        socket.on("reinitTopic", this.reinitTopic)
        socket.on("addTime", this.addTime)
        socket.on("finishTopic", this.finishTopic)
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
        this.broadcastStatus()
        console.log("Partie démarrée")
    }

    private startTopic = (id: number) => {
        this.GAME.startTopic(id, this.gameUpdateCb)
    }
    private showScores = () => {
        this.GAME.showScores()
        this.gameUpdateCb()
    }
    private reinitTopic = (id: number) => {
        this.GAME.reinitTopic(id)
        this.userHandler.reinitTopicForAllPlayers(id)
        console.log("Topic reset")
        this.broadcastStatus()
    }

    private finishTopic = () => {
        this.GAME.finishTopic(this.gameUpdateCb)
        const allUnfinishedPlayerTopics = this.userHandler.getAllUnfinishedPlayerTopics(this.GAME.topic.id)
        allUnfinishedPlayerTopics.forEach(playerTopic => {
            this.submitCode(playerTopic.playerUuid, playerTopic.tempCode || "")
        })
    }

    private addTime = (time: number) => {
        this.GAME.addTimeToTopic(time)
        this.broadcast("newEndTime", this.GAME.endTimer)
    }

    private gameUpdateCb = (options?: GameUpdateOptions) => {
        this.userHandler.updatePropsForAllPlayers({ screen: this.GAME.currentScreen } as Player)
        options?.topic && this.userHandler.updateTopicForAllPlayers(options.topic)
        this.broadcastStatus()
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

    private saveTempCode = (uuid, code) => {
        this.userHandler.setPlayerTempCode(uuid, code, this.GAME.topic)
        this.userHandler.broadcastAdmin("status", this.getAdminStatus())
    }
    private submitCode = (uuid, code) => {
        this.userHandler.setPlayerFinalCode(uuid, code, this.GAME.topic)
        this.GAME.calculateCompletion(code)
            .then(completion => {
                this.userHandler.setPlayerTopicProps(uuid, this.GAME.topic, { completion } as PlayerTopic)
                this.broadcastStatus()
            })
        this.broadcastStatus()
    }

    private shareCode = (uuid) => {
        this.userHandler.shareCode(uuid, this.GAME.topic)
        this.broadcastStatus()
    }

    private calculateScores = () => {
        const allPlayerTopics = this.userHandler.getAllPlayerTopics(this.GAME.topic)
        const allPlayerTopicsWithScore = this.GAME.topic.calculateScore(allPlayerTopics)
        this.userHandler.updateAllPlayerTopics(allPlayerTopicsWithScore)
        this.userHandler.calculateAllPlayerScore()
        this.GAME.calculateScore()
        this.broadcastStatus()
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

export type GameUpdateOptions = {
    topic?: Topic,
}

export default WebSocketServerHandler
