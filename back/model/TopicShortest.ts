import {PlayerTopic} from "../types/GamePlayer";
import TopicCommon from "./TopicCommon";

type PlayerTopicWithPosition = PlayerTopic & {
    position?: number
}

class TopicShortest extends TopicCommon {

    _calculateScore(playerTopics: PlayerTopic[]): PlayerTopic[] {
        let playerTopicsWithLength = this._calculatePosition(playerTopics)

        return playerTopicsWithLength
            .map(playerTopic => ({
                ...playerTopic,
                score: this._calculate(playerTopic, playerTopicsWithLength.length)
            }))
    }

    _comparator = (p1: PlayerTopicWithPosition, p2: PlayerTopicWithPosition) => {
        if (p2.completion - p1.completion !== 0) {
            return p2.completion - p1.completion
        }
        if (p1.codeLength - p2.codeLength !== 0) {
            return p1.codeLength - p2.codeLength
        }

        return p1.duration - p2.duration
    }

    _isSamePosition(p1: PlayerTopic, p2: PlayerTopic) {
        return p1.completion === p2.completion && p1.codeLength === p2.codeLength
                && p1.duration === p2.duration
    }

    _calculatePosition(playerTopics: PlayerTopic[]): PlayerTopicWithPosition[] {
        const playerTopicsWithPosition: PlayerTopicWithPosition[] = playerTopics.sort(this._comparator)
        let previousPlayerTopic = null
        let position = 1
        for (let index in playerTopicsWithPosition) {
            const playerTopic = playerTopicsWithPosition[index]

            if (previousPlayerTopic && this._isSamePosition(previousPlayerTopic, playerTopic)) {
                playerTopic.position = previousPlayerTopic.position
            } else {
                playerTopic.position = position
            }

            position++
            previousPlayerTopic = playerTopic
        }
        return playerTopicsWithPosition
    }

    _calculate(playerTopic: PlayerTopicWithPosition, playerCount: number): number {
        const completion = playerTopic.completion
        if (!completion) {
            return 0
        }

        const maxPoints = completion === 1 ? this.points : this.points / 1.5
        const pointRange = maxPoints / 2.5

        const positionCoeff = (playerTopic.position - 1) / (playerCount - 1)

        const substractedPpoints = pointRange * positionCoeff

        const baseScore = maxPoints - substractedPpoints
        return Math.round(baseScore * completion)
    }

}

export default TopicShortest