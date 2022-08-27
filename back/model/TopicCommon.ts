import Topic, {GameMode, Test} from "../types/Topic";
import {GamePlayerStatus, PlayerTopic} from "../types/GamePlayer";
import TopicShortest from "./TopicShortest";
import TopicFastest from "./TopicFastest";

abstract class TopicCommon implements Topic {
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

    abstract _calculateScore(playerTopics: PlayerTopic[]): PlayerTopic[]

    public calculateScore(playerTopics: PlayerTopic[]): PlayerTopic[] {
        const topics = this._calculateScore(playerTopics)
        this.status = GamePlayerStatus.SCORE_CALCULATED
        return topics
    }

}

export default TopicCommon