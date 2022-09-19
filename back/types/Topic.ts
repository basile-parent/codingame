import {GamePlayerStatus, PlayerTopic} from "./GamePlayer";

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

    calculateScore: (playerTopics: PlayerTopic[]) => PlayerTopic[]
}

export enum GameMode {
    FASTEST = "fastest",
    SHORTEST = "shortest",
    REVERSE = "reverse",
}

export type Test = {
    name?: string,
    inputs: (string | number)[],
    output: (string | number),
    hidden?: boolean,
}

export default Topic