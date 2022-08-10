export enum GamePlayerStatus {
    WAITING = "WAITING",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED",
}

export type GamePlayer = {
    uuid?: string,
    name?: string,
    score?: number,
    topics?: PlayerTopic[]
}

export type PlayerTopic = {
    topicId: number,
    code?: string,
    tempCode?: string,
    completion?: number,
    score?: number,
    status: GamePlayerStatus,
    endTime?: number,
    duration?: number,
}