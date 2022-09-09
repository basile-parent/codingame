import {Socket} from "socket.io"
import Game from "./Game"
import UserHandler from "./UserHandler";
import WSStatus from "../types/WSStatus";
import Player from "../model/Player";
import {PlayerTopic} from "../types/GamePlayer";
import Topic from "../types/Topic";
import GameScreen from "../types/GameScreen";

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
            user = this.userHandler.connectUser(socket, this.GAME)
        } catch(e) {
            console.error(e.message)
            return
        }

        socket.emit("confirmConnect")

        if (user.isAdmin()) {
            socket.emit("status", this.getAdminStatus())
        } else {
            socket.emit("status", this.getPlayerStatus(user as Player))
            this.userHandler.broadcastPresentation("leaderboard", this.userHandler.getAllPlayers())
        }

        this.userHandler.broadcastAdmin("status", this.getAdminStatus())

        this.logPlayers()

        socket.on("setName", this.setPlayerName)

        socket.on("tempCode", this.saveTempCode)
        socket.on("commitCode", this.submitCode)
        socket.on("shareCode", this.shareCode)

        socket.on("calculateTopicScore", this.calculateScores)
        socket.on("showScores", this.showScores)

        socket.on("showPodium", this.showPodium)

        socket.on("disconnect", () => this.disconnectedUser(socket))

        socket.on("startGame", this.startGame)
        socket.on("resetGame", this.resetGame)

        socket.on("finishTopic", this.finishTopic)
        socket.on("startTopic", this.startTopic)
        socket.on("reinitTopic", this.reinitTopic)
        socket.on("addTime", this.addTime)

        socket.on("approvePlayer", this.approvePlayer)
        socket.on("deletePlayer", this.deletePlayer)
        socket.on("deleteAdmin", this.deleteAdmin)
        socket.on("deletePresentation", this.deletePresentation)
    }

    private disconnectedUser = (socket: Socket) => {
        this.userHandler.disconnectedUser(socket)

        this.broadcastStatus()
        this.logPlayers()
    }

    private startGame = () => {
        this.userHandler.setGameToPlayers(this.GAME)
        this.GAME.startGame()
        this.broadcastStatus()
        console.log("Partie démarrée")
    }

    private startTopic = (payload: { id: number }) => {
        this.GAME.startTopic(payload.id, this.gameUpdateCb)
    }
    private showScores = () => {
        this.GAME.showScores()
        this.gameUpdateCb()
    }
    private showPodium = () => {
        this.GAME.showPodium()
        this.gameUpdateCb()
    }
    private reinitTopic = (payload: { id: number }) => {
        this.GAME.reinitTopic(payload.id)
        this.userHandler.reinitTopicForAllPlayers(payload.id)
        console.log("Topic reset")
        this.broadcastStatus()
    }

    private finishTopic = () => {
        this.GAME.finishTopic(this.gameUpdateCb)
        const allUnfinishedPlayerTopics = this.userHandler._getAllUnfinishedPlayerTopics(this.GAME.topic.id)
        allUnfinishedPlayerTopics.forEach(playerTopic => {
            this.submitCode({ uuid: playerTopic.playerUuid, code: playerTopic.tempCode || "" })
        })
    }

    private addTime = (payload: { time: number }) => {
        this.GAME.addTimeToTopic(payload.time)
        this.broadcast("newEndTime", this.GAME.endTimer)
    }

    private gameUpdateCb = (options?: GameUpdateOptions) => {
        this.userHandler.updatePropsForAllPlayers({ screen: this.GAME.currentScreen } as Player)
        options?.topic && this.userHandler.updateTopicForAllPlayers(options.topic)
        this.broadcastStatus()
    }

    private resetGame = () => {
        this.GAME.reset()
        this.userHandler.resetGameOnPlayer()
        this.broadcastStatus()
        console.log("Partie réinitialisée")
    }

    private setPlayerName = (payload: { uuid: string, name: string }) => {
        this.userHandler.setPlayerName(payload.uuid, payload.name)
        this.logPlayers()
        this.broadcastLeaderboard()
    }

    private saveTempCode = (payload: { uuid: string, code: string }) => {
        this.userHandler.setPlayerTempCode(payload.uuid, payload.code, this.GAME.topic)
        this.userHandler.broadcastAdmin("status", this.getAdminStatus())
    }
    private submitCode = (payload: { uuid: string, code: string }) => {
        this.userHandler.setPlayerFinalCode(payload.uuid, payload.code, this.GAME.topic)
        this.GAME.calculateCompletion(payload.code)
            .then(completion => {
                this.userHandler.setPlayerTopicProps(payload.uuid, this.GAME.topic, { completion } as PlayerTopic)
                this.broadcastStatus()
            })
        this.broadcastStatus()
    }

    private shareCode = (payload: { uuid: string }) => {
        this.userHandler.shareCode(payload.uuid, this.GAME.topic)
        this.broadcastStatus()
    }

    private calculateScores = () => {
        const allPlayerTopics = this.userHandler.getAllPlayerTopics(this.GAME.topic)
        const allPlayerTopicsWithScore = this.GAME.topic.calculateScore(allPlayerTopics)
        this.userHandler.updateAllPlayerTopics(allPlayerTopicsWithScore)
        this.userHandler.calculateAllPlayerScoreAndPosition()
        this.GAME.calculateScore()
        this.broadcastStatus()
    }

    private approvePlayer = (payload: { uuid: string }) => {
        this.userHandler.approvePlayer(payload.uuid)
        // @ts-ignore
        console.log(this.userHandler.PLAYERS)
        this.logPlayers()
        this.broadcastStatus()
    }
    private deletePlayer = (payload: { uuid: string }) => {
        this.userHandler.deletePlayer(payload.uuid)
        this.logPlayers()
        this.broadcastStatus()
    }
    private deleteAdmin = (payload: { uuid: string }) => {
        this.userHandler.deleteAdmin(payload.uuid)
        this.logPlayers()
        this.broadcastStatus()
    }
    private deletePresentation = (payload: { uuid: string }) => {
        this.userHandler.deletePresentation(payload.uuid)
        this.logPlayers()
        this.broadcastStatus()
    }

    private logPlayers = () => {
        console.log(this.userHandler.toString())
    }

    private broadcastStatus = () => {
        this.userHandler.broadcastEachPlayers("status", p => [ this.getPlayerStatus(p) ])
        this.userHandler.broadcastAdmin("status", this.getAdminStatus())
        this.userHandler.broadcastPresentation("status", this.getAdminStatus())
    }

    public getAdminStatus = (): WSStatus => {
        return {
            screen: this.GAME.currentScreen,
            game: this.GAME.toAdminJson(),
            players: this.userHandler.getAllPlayers(),
            admins: this.userHandler.getAllAdmins(),
            presentations: this.userHandler.getAllPresentations(),
            transitionTimeout: this.GAME.transitionTimeout,
            waitForApproval: false,
        }
    }

    private getPlayerStatus = (player: Player): WSStatus => {
        return {
            screen: player.waitForApproval ? GameScreen.LANDING_PAGE : player.screen,
            game: this.GAME.toPublicJson(),
            players: this.userHandler.getLeaderboard(),
            transitionTimeout: this.GAME.transitionTimeout,
            waitForApproval: player.waitForApproval,
        }
    }

    private broadcastLeaderboard = () => {
        this.userHandler.broadcastPlayers("leaderboard", this.userHandler.getLeaderboard())
        this.userHandler.broadcastAdmin("leaderboard", this.userHandler.getAllPlayers())
        this.userHandler.broadcastPresentation("leaderboard", this.userHandler.getAllPlayers())
    }

    private broadcast = (topic, ...args) => {
        this.userHandler.broadcast(topic, ...args)
    }

}

export type GameUpdateOptions = {
    topic?: Topic,
}

export default new WebSocketServerHandler()