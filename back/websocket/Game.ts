import Topic from "../types/Topic";
import * as fs from "fs"
import GameScreen from "../types/GameScreen"
import {GamePlayerStatus} from "../types/GamePlayer";

class Game {
    public screen: GameScreen
    public allTopics: Topic[]
    public topic: Topic | null = null
    public topicIndex: number | null = null
    public endTimer: number | null = null
    public transitionTimeout: number = 0

    private timerTimeout: ReturnType<typeof setTimeout> | null = null

    constructor() {
        this.screen = GameScreen.LANDING_PAGE
        this.topicIndex = 0
        this.allTopics = this._initTopics()
    }

    _initTopics(): Topic[] {
        const allFiles = fs.readdirSync("./topics")
        return allFiles.filter(fileName => fileName.endsWith(".json"))
            .map(fileName => JSON.parse(String(fs.readFileSync(`./topics/${fileName}`))))
            .map(topic => ({
                ...topic,
                status: GamePlayerStatus.WAITING
            }))
            .sort((t1, t2) => t1.id - t2.id)
    }

    startGame(updateCb: () => void, onUpdateTopic: (topic: Topic) => void) {
        this._setTransitionTimeout(3000)
        this.screen = GameScreen.GAME_EDITOR
        this.startTopic(this.allTopics[0].id, updateCb, onUpdateTopic)
    }

    startTopic(id: number, updateCb: () => void, onUpdateTopic: (topic: Topic) => void) {
        this.allTopics[this.topicIndex].startTime = new Date().getTime()
        this.topic = this.allTopics[this.topicIndex]
        this.topic.status = GamePlayerStatus.IN_PROGRESS
        onUpdateTopic(this.topic)

        // 2s of margin (instruction display) + 3s of transition countdown
        const topicDuration = (this.topic.timer * 1000) + 2000 + this.transitionTimeout
        this.endTimer = new Date().getTime() + topicDuration
        this.timerTimeout = setTimeout(() => {
            this.topic.status = GamePlayerStatus.FINISHED
            this.screen = GameScreen.AFTER_GAME
            console.log(`Timer finished for topic ${ this.topic.id } ${ this.topic.summary }.`)
            updateCb()
            onUpdateTopic(this.topic)

        // Setup 2s later to avoid the conflicts with player's local clock
        }, topicDuration + 1000)
    }

    toPublicJson() {
        let game = null
        if (this.topic) {
            game = {
                endTimer: this.endTimer,
                transitionTimeout: this.transitionTimeout,
                topic: {
                    ...this.topic,
                    points: undefined,
                    maxPointsTimer: undefined,
                    tests: this.topic.tests.filter(test => !test.hidden)
                },
            }
        }

        return game
    }

    toAdminJson() {
        return { ...this, timerTimeout: undefined }
    }

    _setTransitionTimeout(timeout: number) {
        this.transitionTimeout = timeout
        setTimeout(() => {
            this.transitionTimeout = 0
        }, timeout)
    }
}

export default Game