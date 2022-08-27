import Topic, {GameMode} from "../types/Topic";
import TopicShortest from "../model/TopicShortest";
import TopicFastest from "../model/TopicFastest";

const buildTopicFromJson = (jsonObject: any): Topic => {
    let topic
    if (jsonObject.gameMode === GameMode.SHORTEST) {
        topic = new TopicShortest(jsonObject)
    } else {
        topic = new TopicFastest(jsonObject)
    }
    return topic
}

export default {
    buildTopicFromJson
}