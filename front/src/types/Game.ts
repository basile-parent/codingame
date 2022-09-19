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
    REVERSE = "reverse",
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
    SCORE_CALCULATED = "SCORE_CALCULATED",
}

export const toTopicStatusLabel = (topicStatus: TopicStatus) => {
    switch(topicStatus) {
        case TopicStatus.WAITING:
            return "En attente"
        case TopicStatus.IN_PROGRESS:
            return "En cours"
        case TopicStatus.FINISHED:
            return "Terminé"
        case TopicStatus.SCORE_CALCULATED:
            return "Scores calculés"
        default:
            return "???"
    }
}

type Test = {
    name?: string,
    inputs: (string | number)[],
    output: (string | number)
}

export type UnitTestExecution = Test & {
    id: number,
    status: UnitTestExecutionStatus,
    consoleOutput?: any,
    outdated: boolean,
}

export enum UnitTestExecutionStatus {
    WAIT = "WAIT",
    IN_PROGRESS = "IN_PROGRESS",
    FAIL = "FAIL",
    SUCCESS = "SUCCESS",
}