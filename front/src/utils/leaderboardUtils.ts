import {GameMode, Topic} from "../types/Game"
import {GamePlayer} from "../types/Player"
import playerUtils from "./playerUtils";

const getTopicPlayerDisplayProps = (topic: Topic): (p1: GamePlayer, p2: GamePlayer) => number => {
    switch (topic.gameMode) {
        case GameMode.SHORTEST:
            return _codeLengthComparator(topic)
        default:
            return _completionComparator(topic)
    }
}

const _completionComparator = (topic: Topic) => (p1: GamePlayer, p2: GamePlayer): number => {
    const playerTopic1 = playerUtils.getPlayerTopic(p1, topic)
    const playerTopic2 = playerUtils.getPlayerTopic(p2, topic)

    const diffCompletion = (playerTopic1.completion ?? -1) - (playerTopic2.completion ?? -1)
    return diffCompletion !== 0 ? diffCompletion * -1 : (playerTopic1.duration ?? -1) - (playerTopic2.duration ?? -1)
}

const _codeLengthComparator = (topic: Topic) => (p1: GamePlayer, p2: GamePlayer): number => {
    const playerTopic1 = playerUtils.getPlayerTopic(p1, topic)
    const playerTopic2 = playerUtils.getPlayerTopic(p2, topic)

    const diffCompletion = (playerTopic1.completion ?? -1) - (playerTopic2.completion ?? -1)
    if (diffCompletion !== 0) {
        return diffCompletion * -1
    }
    const diffCodeLength = (playerTopic1.codeLength ?? -1) - (playerTopic2.codeLength ?? -1)
    return diffCodeLength !== 0 ? diffCodeLength : (playerTopic1.duration ?? -1) - (playerTopic2.duration ?? -1)
}

export default {
    getTopicPlayerDisplayProps
}