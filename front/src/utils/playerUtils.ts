import { v4 as uuidv4 } from 'uuid'
import {GamePlayer, GamePlayerStatus, PlayerTopic} from "../types/Player";
import {Topic} from "../types/Game";

const getPlayerName = (): string | null => localStorage.getItem("name")
const setPlayerName = (name: string): void => localStorage.setItem("name", name)

const getSavedCode = (): string | null => localStorage.getItem("savedCode")
const saveCode = (code: string): void => localStorage.setItem("savedCode", code)
const cleanSavedCode = (): void => localStorage.removeItem("savedCode")

const getPlayerUuid = (): string => {
    let uuid = localStorage.getItem("uuid")
    if (uuid) {
        return uuid
    }

    uuid = uuidv4()
    localStorage.setItem("uuid", uuid)
    return uuid
}

const getPlayerTopic = (player: GamePlayer, topic: Topic): PlayerTopic => {
    return player.topics!.find(t => t.topicId === topic.id)!;
}

const translatePlayerTopicStatus = (status: GamePlayerStatus) => {
    switch (status) {
        case GamePlayerStatus.WAITING:
            return "En attente"
        case GamePlayerStatus.IN_PROGRESS:
            return "En cours"
        case GamePlayerStatus.FINISHED:
            return "Terminé"
        default:
            return "???"
    }
}

export default {
    getPlayerName,
    setPlayerName,
    getPlayerUuid,
    getPlayerTopic,
    translatePlayerTopicStatus,
    getSavedCode,
    saveCode,
    cleanSavedCode,
}