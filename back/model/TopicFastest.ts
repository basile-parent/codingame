import {PlayerTopic} from "../types/GamePlayer";
import TopicCommon from "./TopicCommon";
import Topic from "../types/Topic";

class TopicFastest extends TopicCommon {

    calculateScore(topic: Topic, playerTopics: PlayerTopic[]): PlayerTopic[] {
        return playerTopics.map(playerTopic => ({
            ...playerTopic,
            score: this._calculateScore(topic, playerTopic)
        }))
    }

    _calculateScore(topic: Topic, playerTopic: PlayerTopic): number {
        const completion = playerTopic.completion
        if (completion === 0) {
            return 0
        }

        const maxPoints = completion === 1 ? topic.points : topic.points / 1.5
        const pointRange = maxPoints / 2

        const maxTimeWithDelay = topic.timer
        const maxTime = maxTimeWithDelay - topic.maxPointsTimer

        const maxScoreDelay = topic.maxPointsTimer
        const duration = playerTopic.duration / 1000
        const durationSinceMaxScore = duration - maxScoreDelay

        const substractedPpoints =
            durationSinceMaxScore <= 0 ?
                0 :
                (durationSinceMaxScore / maxTime) * pointRange

        const baseScore = maxPoints - substractedPpoints
        return Math.round(baseScore * completion)
    }

}

export default TopicFastest