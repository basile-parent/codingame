type Topic = {
    timer: number,
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