export enum GamePlayerStatus {
    IN_PROGRESS,
    FINISHED,
}

export type GamePlayer = {
    pseudo: string,
    completion: number | null,
    status: GamePlayerStatus
}