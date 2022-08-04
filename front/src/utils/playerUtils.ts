import { v4 as uuidv4 } from 'uuid'

const getPlayerName = (): string | null => localStorage.getItem("name")
const setPlayerName = (name: string): void => localStorage.setItem("name", name)
const getPlayerUuid = (): string => {
    let uuid = localStorage.getItem("uuid")
    if (uuid) {
        return uuid
    }

    uuid = uuidv4()
    localStorage.setItem("uuid", uuid)
    return uuid
}

export default {
    getPlayerName,
    setPlayerName,
    getPlayerUuid,
}