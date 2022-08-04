export type Game = {
    topic: Topic,
    endTimer?: number
}

enum GameMode {
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
    tests: Test[]
}

type Test = {
    inputs: (string | number)[],
    output: (string | number)
}