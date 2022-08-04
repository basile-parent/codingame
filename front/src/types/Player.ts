export enum GamePlayerStatus {
    IN_PROGRESS,
    FINISHED,
}

export type GamePlayer = {
    name: string,
    score?: number,
    completion: number | null,
    status: GamePlayerStatus
}