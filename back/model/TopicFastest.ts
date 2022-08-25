import {PlayerTopic} from "../types/GamePlayer";
import TopicCommon from "./TopicCommon";

class TopicFastest extends TopicCommon {

    _calculateScore(playerTopics: PlayerTopic[]): PlayerTopic[] {
        return playerTopics.map(playerTopic => ({
            ...playerTopic,
            score: this._calculate(playerTopic)
        }))
    }

    _calculate(playerTopic: PlayerTopic): number {
        const completion = playerTopic.completion
        if (!completion) {
            return 0
        }

        const maxPoints = completion === 1 ? this.points : this.points / 1.5
        const pointRange = maxPoints / 2

        const maxTimeWithDelay = this.timer
        const maxTime = maxTimeWithDelay - this.maxPointsTimer

        const maxScoreDelay = this.maxPointsTimer
        const duration = playerTopic.duration
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