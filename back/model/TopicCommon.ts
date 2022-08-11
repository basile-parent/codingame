import Topic, {GameMode, Test} from "../types/Topic";
import {GamePlayerStatus, PlayerTopic} from "../types/GamePlayer";

class TopicCommon implements Topic {
    constraints: string[];
    defaultCode: string;
    examples: Test[];
    gameMode: GameMode;
    id: number;
    inputs: string;
    maxPointsTimer: number;
    output: string;
    points: number;
    startTime: number;
    status: GamePlayerStatus;
    subject: string;
    summary: string;
    tests: Test[];
    timer: number;

    constructor(jsonTopic: Topic) {
        Object.assign(this, jsonTopic)
    }

    calculateScore(topic: Topic, playerTopics: PlayerTopic[]): PlayerTopic[] {
        throw new Error("Not implemented in TopicCommon")
    }

}

export default TopicCommon