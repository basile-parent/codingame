import {PlayerTopic} from "../types/GamePlayer";
import TopicCommon from "./TopicCommon";
import Topic from "../types/Topic";

class TopicFastest extends TopicCommon {

    calculateScore(playerTopics: PlayerTopic[]): PlayerTopic[] {
        return playerTopics.map(playerTopic => ({
            ...playerTopic,
            score: this._calculateScore(playerTopic)
        }))
    }

    _calculateScore(playerTopic: PlayerTopic): number {
        const completion = playerTopic.completion
        if (completion === 0) {
            return 0
        }

        const maxPoints = completion === 1 ? this.points : this.points / 1.5
        const pointRange = maxPoints / 2

        const maxTimeWithDelay = this.timer
        const maxTime = maxTimeWithDelay - this.maxPointsTimer

        const maxScoreDelay = this.maxPointsTimer
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