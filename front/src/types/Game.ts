import {GamePlayer} from "./Player";

export type Game = {
    topic: Topic | null,
    endTimer?: number,
    players: GamePlayer[],
    allTopics: Topic[],
    transitionTimeout: number,
}

export enum GameMode {
    FASTEST = "fastest",
    SHORTEST = "shortest",
}

type Topic = {
    id: number,
    summary: string,
    timer: number,
    isFinished: boolean,
    gameMode: GameMode,
    subject: string,
    inputs: string,
    output: string,
    constraints?: string[],
    examples?: Test[],
    defaultCode?: string,
    tests: Test[],
}

type Test = {
    inputs: (string | number)[],
    output: (string | number)
}

export type UnitTestExecution = Test & {
    id: number,
    status: UnitTestExecutionStatus,
    consoleOutput?: any
}

export enum UnitTestExecutionStatus {
    WAIT = "WAIT",
    IN_PROGRESS = "IN_PROGRESS",
    FAIL = "FAIL",
    SUCCESS = "SUCCESS",
}