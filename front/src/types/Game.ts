export type Game = {
    started: boolean,
    topic: Topic | null,
    endTimer?: number,
    allTopics: Topic[],
    transitionTimeout: number,
}

export enum GameMode {
    FASTEST = "fastest",
    SHORTEST = "shortest",
}

export type Topic = {
    id: number,
    summary: string,
    timer: number,
    points: number,
    gameMode: GameMode,
    status: TopicStatus,
    subject: string,
    inputs: string,
    output: string,
    constraints?: string[],
    examples?: Test[],
    defaultCode?: string,
    tests: Test[],
}

export enum TopicStatus {
    WAITING = "WAITING",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED",
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