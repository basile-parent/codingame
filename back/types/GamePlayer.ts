export enum GamePlayerStatus {
    WAITING = "WAITING",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED",
    SCORE_CALCULATED = "SCORE_CALCULATED",
}

export type GamePlayer = {
    uuid?: string,
    name?: string,
    score?: number,
    topics?: PlayerTopic[]
}

export type PlayerTopic = {
    playerUuid: string,
    topicId: number,
    code?: string,
    completion?: number,
    score?: number,
    status: GamePlayerStatus,
    endTime?: number,
    duration?: number,
}