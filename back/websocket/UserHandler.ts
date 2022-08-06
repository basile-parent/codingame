import {Socket} from "socket.io";
import {GamePlayer} from "../types/GamePlayer";
import Admin from "./Admin";
import Player from "./Player";
import User from "./User";

class UserHandler {
    private ADMINS: Admin[] = []
    private PLAYERS: Player[] = []

    public connectUser = (socket: Socket): User => {
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
            // this.ADMINS.push({socket: socket, data: {uuid, status: GamePlayerStatus.WAITING}})
            newUser = new Admin(socket, uuid, true)
            this.ADMINS.push(newUser)
        } else {
            // this.PLAYERS.push({socket: socket, data: {uuid, score: 0, status: GamePlayerStatus.WAITING}})
            newUser = new Player(socket, uuid, null, true)
            this.PLAYERS.push(new Player(socket, uuid, null, true))
        }

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
    }

    public getAllPlayers = (): Player[] => {
        return this.PLAYERS.map(a => a.toAdminPlayer())
    }

    public getLeaderboard = (): GamePlayer[] => {
        return this.PLAYERS.filter(p => p.name).map(p => p.toPublicPlayer())
    }

    public toString = (): string => {
        const adminLabel = `${this.ADMINS.length} admin${this.ADMINS.length > 1 ? "s" : ""}`
        const connectedPlayers = this.PLAYERS.filter(p => p.connected)
        const disconnectedPlayers = this.PLAYERS.filter(p => !p.connected)
        const connectedPlayerLabel =
            `${connectedPlayers.length} connected player${connectedPlayers.length > 1 ? "s" : ""} : ` +
            `${connectedPlayers.map(p => p.toString()).join(", ") || "-"}`
        const disconnectedPlayerLabel = this.PLAYERS.length > 0 ?
            `${disconnectedPlayers.length} connected player${disconnectedPlayers.length > 1 ? "s" : ""} : ` +
            `${disconnectedPlayers.map(p => p.toString()).join(", ") || "-"}`
            : ""
        const labels = [adminLabel, connectedPlayerLabel, disconnectedPlayerLabel].filter(label => label)
        if (labels.length) {
            return `There is ${labels.join(", ")}`
        }

        return "There is nobody"
    }

    public broadcastAdmin = (...args): void => {
        // @ts-ignore
        this.ADMINS.forEach(a => a.socket.emit(...args))
    }
    public broadcastPlayers = (...args): void => {
        // @ts-ignore
        this.ADMINS.forEach(a => a.socket.emit(...args))
    }

    public broadcast = (...args): void => {
        this.broadcastAdmin(...args)
        this.broadcastPlayers(...args)
    }

    public sendMessageToPlayer = (uuid, topic, message): void => {
        const player = this.PLAYERS.find(p => p.uuid === uuid)
        if (player) {
            console.debug(`Sending message to player [${player.toString()}] on topic [${topic}].`)
            player.socket.emit(topic, message)
        } else {
            console.error(`Cannot send message to player [${uuid}] : not connected to server.`)
        }
    }

}

export default UserHandler