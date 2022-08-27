import {Socket} from "socket.io";
import {GamePlayer, GamePlayerStatus, PlayerTopic} from "../types/GamePlayer";
import Admin from "../model/Admin";
import Player from "../model/Player";
import User from "../model/User";
import Game, {TIME_MARGIN, TRANSITION_TIMEOUT} from "./Game";
import Topic from "../types/Topic";
import GameScreen from "../types/GameScreen";
import PersistentObject from "./PersistentObject";

class UserHandler extends PersistentObject {
    private ADMINS: Admin[] = []
    private PLAYERS: Player[] = []

    constructor() {
        super("Users")

        if (this.load()) {
            console.log("Utilisateurs chargés !")
        }
    }

    public connectUser = (socket: Socket, isGameStarted: boolean): User => {
        const uuid = <string>socket.handshake.headers["x-uuid"]

        const existingAdminIndex = this.ADMINS.findIndex(a => a.uuid === uuid)
        if (existingAdminIndex >= 0) {
            this.ADMINS[existingAdminIndex].socket = socket
            this.ADMINS[existingAdminIndex].connected = true
            return this.ADMINS[existingAdminIndex]
        }
        const existingPlayerIndex = this.PLAYERS.findIndex(a => a.uuid === uuid)
        if (existingPlayerIndex >= 0) {
            this.PLAYERS[existingPlayerIndex].socket = socket
            this.PLAYERS[existingPlayerIndex].connected = true
            return this.PLAYERS[existingPlayerIndex]
        }

        const mode = socket.handshake.headers["x-mode"]

        let newUser
        if (mode === "ADMIN") {
            newUser = new Admin(socket, uuid, true)
            this.ADMINS.push(newUser)
        } else {
            if (isGameStarted) {
                throw new Error(`Cannot accept new users when the game is started [${ uuid }]`)
            }

            newUser = new Player(socket, uuid, null, true)
            this.PLAYERS.push(new Player(socket, uuid, null, true))
        }

        this.save()

        return newUser
    }

    public disconnectedUser = (socket: Socket) => {
        const index = this.PLAYERS.findIndex(p => p.socket === socket)
        if (index >= 0) {
            console.log(`${this.PLAYERS[index].toString()} disconnected`)
            this.PLAYERS[index].connected = false
            return
        }

        const indexAdmin = this.ADMINS.findIndex(p => p.socket === socket)
        if (indexAdmin >= 0) {
            console.log("Admin disconnected")
            this.ADMINS[indexAdmin].connected = false
            return
        }

        console.log("Unfound player disconnected")
    }

    public setPlayerName = (uuid, name): void => {
        const index = this.PLAYERS.findIndex(p => p.uuid === uuid)
        const player = this.PLAYERS[index]
        player.name = name

        this.save()
    }

    public updateTopicForAllPlayers = (topic: Topic) => {
        this.PLAYERS.forEach(player => {
            const playerTopicIndex = player.topics.findIndex(t => t.topicId === topic.id)
            const playerTopic = player.topics[playerTopicIndex]
            playerTopic.status = topic.status
            if (topic.status === GamePlayerStatus.FINISHED && !playerTopic.endTime) {
                playerTopic.endTime = new Date().getTime()
                playerTopic.duration = Math.max(playerTopic.endTime - topic.startTime - TIME_MARGIN - TRANSITION_TIMEOUT, 1000) // Minimum 1s
            }

            player.topics[playerTopicIndex] = playerTopic
        })

        this.save()
    }

    public _getAllUnfinishedPlayerTopics = (topicId: number): PlayerTopic[] => {
        return this.PLAYERS
            .map(player => player.topics.find(t => t.topicId === topicId))
            .filter(playerTopic => !playerTopic.code)
    }

    public reinitTopicForAllPlayers = (topicId: number) => {
        this.PLAYERS.forEach(player => {
            const playerTopicIndex = player.topics.findIndex(t => t.topicId === topicId)
            const playerTopic = player.topics[playerTopicIndex]
            playerTopic.status = GamePlayerStatus.WAITING
            playerTopic.endTime = undefined
            playerTopic.duration = undefined
            playerTopic.completion = undefined
            playerTopic.score = undefined
            playerTopic.code = undefined
            playerTopic.codeLength = undefined
            playerTopic.isCodeShared = false

            player.topics[playerTopicIndex] = playerTopic
        })
        this.calculateAllPlayerScoreAndPosition()

        // Save is done by the "calcule" function
    }

    public updatePropsForAllPlayers = (playerProps: Player) => {
        this.PLAYERS.forEach(player => {
            for (let [prop, value] of Object.entries(playerProps)) {
                player[prop] = value
            }
        })

        this.save()
    }

    public setGameToPlayer = (game: Game): void => {
        this.PLAYERS.forEach(player => {
            player.topics = game.allTopics.map(topic => ({ topicId: topic.id, playerUuid: player.uuid, status: GamePlayerStatus.WAITING, isCodeShared: false }))
        })

        this.save()
    }
    public resetGameOnPlayer = (): void => {
        this.PLAYERS.forEach(player => {
            player.screen = GameScreen.LANDING_PAGE
            player.topics = undefined
            player.score = 0
            player.previousScore = 0
        })

        this.save()
    }

    public getAllPlayers = (): Player[] => {
        return this.PLAYERS.map(p => p.toAdminPlayer())
    }

    public getLeaderboard = (): GamePlayer[] => {
        return this.PLAYERS.filter(p => p.name).map(p => p.toPublicPlayer())
    }

    public getAllPlayerTopics(topic: Topic): PlayerTopic[] {
        return this.PLAYERS.map(player => player.topics.find(t => t.topicId === topic.id))
    }
    public calculateAllPlayerScoreAndPosition(): void {
        this.PLAYERS.forEach(player => {
            player.previousPosition = player.position
            player.previousScore = player.score
            player.score = player.topics.reduce((acc, playerTopic) => acc + (playerTopic.score || 0), 0)
        })

        const sortedPlayers = [ ...this.PLAYERS ].sort((p1, p2) => p2.score - p1.score)
        let previousPlayer = null
        let position = 1
        for (let index in sortedPlayers) {
            const player = sortedPlayers[index]

            if (previousPlayer && player.score === previousPlayer.score) {
                player.position = previousPlayer.position
            } else {
                player.position = position
            }

            position++
            previousPlayer = player
        }

        this.save()
    }
    public updateAllPlayerTopics(allPlayerTopics: PlayerTopic[]): void {
        allPlayerTopics.forEach(playerTopic => {
            const player = this.PLAYERS.find(player => player.uuid === playerTopic.playerUuid)
            const exisingTopicIndex = player.topics.findIndex(t => t.topicId === playerTopic.topicId)
            player.topics[exisingTopicIndex] = playerTopic
        })

        this.save()
    }
    public setPlayerTempCode(uuid: string, code: string, topic: Topic) {
        const player = this.PLAYERS.find(p => p.uuid === uuid)
        const playerTopic = player.topics.find(t => t.topicId === topic.id)
        playerTopic.tempCode = code

        this.save()
    }
    public setPlayerFinalCode(uuid: string, code: string, topic: Topic): PlayerTopic {
        const player = this.PLAYERS.find(p => p.uuid === uuid)
        player.screen = GameScreen.AFTER_GAME
        const playerTopic = player.topics.find(t => t.topicId === topic.id)
        playerTopic.code = code
        playerTopic.tempCode = null
        playerTopic.codeLength = code.length
        playerTopic.status = GamePlayerStatus.FINISHED
        playerTopic.endTime = new Date().getTime()
        playerTopic.duration = Math.max(playerTopic.endTime - topic.startTime - TIME_MARGIN - TRANSITION_TIMEOUT, 1000) // Minimum 1s

        this.save()

        return playerTopic
    }

    public setPlayerTopicProps(uuid: string, topic: Topic, props: PlayerTopic): PlayerTopic {
        const player = this.PLAYERS.find(p => p.uuid === uuid)
        player.screen = GameScreen.AFTER_GAME
        const playerTopic = player.topics.find(t => t.topicId === topic.id)
        for (let [key, value] of Object.entries(props)) {
            playerTopic[key] = value
        }

        this.save()

        return playerTopic
    }
    
    public shareCode(uuid: string, topic: Topic) {
        const player = this.PLAYERS.find(p => p.uuid === uuid)
        const playerTopic = player.topics.find(t => t.topicId === topic.id)
        playerTopic.isCodeShared = true

        this.save()
    }

    public toString = (): string => {
        const adminLabel = `${this.ADMINS.length} admin${this.ADMINS.length > 1 ? "s" : ""}`
        const connectedPlayers = this.PLAYERS.filter(p => p.connected)
        const disconnectedPlayers = this.PLAYERS.filter(p => !p.connected)
        const connectedPlayerLabel =
            `${connectedPlayers.length} connected player${connectedPlayers.length > 1 ? "s" : ""} : ` +
            `${connectedPlayers.map(p => p.toString()).join(", ") || "-"}`
        const disconnectedPlayerLabel = this.PLAYERS.length > 0 ?
            `${disconnectedPlayers.length} disconnected player${disconnectedPlayers.length > 1 ? "s" : ""} : ` +
            `${disconnectedPlayers.map(p => p.toString()).join(", ") || "-"}`
            : ""
        const labels = [adminLabel, connectedPlayerLabel, disconnectedPlayerLabel].filter(label => label)
        if (labels.length) {
            return `There is ${labels.join(", ")}`
        }

        return "There is nobody"
    }

    public broadcastAdmin = (topic, ...args): void => {
        // @ts-ignore
        this.ADMINS.forEach(admin => admin.socket?.emit(topic, ...args))
    }
    public broadcastPlayers = (topic, ...args): void => {
        // @ts-ignore
        this.PLAYERS.forEach(player => player.socket?.emit(topic, ...args))
    }
    public broadcastEachPlayers = (topic, computePlayerMessage: (player: Player) => any[]): void => {
        this.PLAYERS.forEach(player => player.socket?.emit(topic, ...computePlayerMessage(player)))
    }

    public broadcast = (topic, ...args): void => {
        this.broadcastAdmin(topic, ...args)
        this.broadcastPlayers(topic, ...args)
    }

    public sendMessageToPlayer = (uuid, topic, message): void => {
        const player = this.PLAYERS.find(p => p.uuid === uuid)
        if (player) {
            console.debug(`Sending message to player [${player.toString()}] on topic [${topic}].`)
            player.socket?.emit(topic, message)
        } else {
            console.error(`Cannot send message to player [${uuid}] : not connected to server.`)
        }
    }

    toJson(): PersistentObject {
        return {
            ADMINS: this.ADMINS.map(p => p.toJson()),
            PLAYERS: this.PLAYERS.map(p => p.toJson()),
        } as any
    }

    loadFromJson(jsonObject: Object) {
        const json = jsonObject as UserHandler
        this.ADMINS = json.ADMINS?.map(a => Admin.fromJson(a)) || []
        this.PLAYERS = json.PLAYERS?.map(p => Player.fromJson(p)) || []
    }
}

export default UserHandler