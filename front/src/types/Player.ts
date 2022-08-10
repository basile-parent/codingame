import GameScreen from "../../../back/types/GameScreen";

export enum GamePlayerStatus {
    WAITING = "WAITING",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED",
}

export type GamePlayer = {
    uuid: string,
    connected: boolean,
    name: string,
    screen: GameScreen,
    score?: number,
    topics?: PlayerTopic[]
}

export type PlayerTopic = {
    topicId: number,
    code?: string,
    tempCode?: string,
    completion?: number,
    score?: number,
    status: GamePlayerStatus
}