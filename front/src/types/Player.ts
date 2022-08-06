export enum GamePlayerStatus {
    WAITING = "WAITING",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED",
}

export type GamePlayer = {
    uuid: string,
    connected: boolean,
    name: string,
    score?: number,
    completion: number | null,
    status: GamePlayerStatus
}