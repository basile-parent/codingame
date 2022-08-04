export enum GamePlayerStatus {
    WAITING = "WAITING",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED",
}

export type GamePlayer = {
    uuid?: string,
    name?: string,
    score?: number,
    completion?: number,
    status: GamePlayerStatus
}