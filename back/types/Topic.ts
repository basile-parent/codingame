import {GamePlayerStatus} from "./GamePlayer";

type Topic = {
    id: number,
    summary: string,
    timer: number,
    startTime?: number,
    status: GamePlayerStatus,
    points: number,
    maxPointsTimer: number,
    gameMode: GameMode,
    subject: string,
    inputs: string,
    output: string,
    constraints?: string[],
    examples?: Test[],
    defaultCode?: string,
    tests: Test[],
}

export enum GameMode {
    FASTEST = "fastest",
    SHORTEST = "shortest",
}

type Test = {
    inputs: (string | number)[],
    output: (string | number),
    hidden?: boolean,
}

export default Topic