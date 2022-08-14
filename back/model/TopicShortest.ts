import {PlayerTopic} from "../types/GamePlayer";
import TopicCommon from "./TopicCommon";
import Topic from "../types/Topic";

type PlayerTopicWithLength = PlayerTopic & {
    codeLength?: number
    position?: number
}

const _codeLengthComparator = (p1: PlayerTopicWithLength, p2: PlayerTopicWithLength) => p1.codeLength - p2.codeLength

class TopicShortest extends TopicCommon {

    _calculateScore(playerTopics: PlayerTopic[]): PlayerTopic[] {
        let playerTopicsWithLength = playerTopics
            .map(playerTopic => ({
                ...playerTopic,
                codeLength: playerTopic.code.length
            }) as PlayerTopicWithLength)
        playerTopicsWithLength = this._calculatePosition(playerTopicsWithLength)

        return playerTopicsWithLength
            .map(playerTopic => ({
                ...playerTopic,
                score: this._calculate(playerTopic, playerTopicsWithLength.length)
            }))
    }

    _calculatePosition(playerTopics: PlayerTopicWithLength[]): PlayerTopicWithLength[] {
        playerTopics.sort(_codeLengthComparator)
        let previousPlayerTopic = null
        let position = 1
        for (let index in playerTopics) {
            const playerTopic = playerTopics[index]

            if (previousPlayerTopic && previousPlayerTopic.codeLength === playerTopic.codeLength) {
                playerTopic.position = previousPlayerTopic.position
            } else {
                playerTopic.position = position
            }

            position++
            previousPlayerTopic = playerTopic
        }
        return playerTopics
    }

    _calculate(playerTopic: PlayerTopicWithLength, playerCount: number): number {
        const completion = playerTopic.completion
        if (completion === 0) {
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