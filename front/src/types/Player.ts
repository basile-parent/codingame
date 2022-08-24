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
    previousScore: number,
    score: number,
    topics?: PlayerTopic[]
}

export type PlayerTopic = {
    topicId: number,
    codeLength?: number,
    tempCode?: string,
    code?: string,
    completion?: number,
    score?: number,
    status: GamePlayerStatus,
    duration?: number,
}