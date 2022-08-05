import {GamePlayer} from "./Player";

export type Game = {
    topic: Topic,
    endTimer?: number;
    players: GamePlayer[],
}

export enum GameMode {
    FASTEST = "fastest",
    SHORTEST = "shortest",
}

type Topic = {
    timer: number,
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