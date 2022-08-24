import Topic, {GameMode, Test} from "../types/Topic";
import * as fs from "fs"
import GameScreen from "../types/GameScreen"
import {GamePlayerStatus, PlayerTopic} from "../types/GamePlayer";
import testRunner from "./testRunner";
import {GameUpdateOptions} from "./websocket-handler";
import TopicShortest from "../model/TopicShortest";
import TopicFastest from "../model/TopicFastest";

class Game {
    public started: boolean
    public currentScreen: GameScreen
    public allTopics: Topic[]
    public topic: Topic | null = null
    public topicIndex: number | null = null
    public endTimer: number | null = null
    public transitionTimeout: number = 0

    constructor() {
        this.currentScreen = GameScreen.LANDING_PAGE
        this.allTopics = this._initTopics()
        this.started = false
    }

    _initTopics(): Topic[] {
        const allFiles = fs.readdirSync("./topics")
        return allFiles.filter(fileName => fileName.endsWith(".json"))
            .map(fileName => JSON.parse(String(fs.readFileSync(`./topics/${fileName}`))))
            .map((jsonTopic: Topic) => {
                let topic
                if (jsonTopic.gameMode === GameMode.SHORTEST) {
                    topic = new TopicShortest(jsonTopic)
                } else {
                    topic = new TopicFastest(jsonTopic)
                }

                topic.status = GamePlayerStatus.WAITING
                return topic
            })
            .sort((t1, t2) => t1.id - t2.id)
    }

    startGame() {
        this.started = true
    }

    startTopic(id: number, updateCb: (options: GameUpdateOptions) => void) {
        this.topicIndex = this.allTopics.findIndex(t => t.id == id)
        this.currentScreen = GameScreen.GAME_EDITOR
        this._setTransitionTimeout(3000)

        this.allTopics[this.topicIndex].startTime = new Date().getTime()
        this.topic = this.allTopics[this.topicIndex]
        this.topic.status = GamePlayerStatus.IN_PROGRESS

        // 2s of margin (instruction display) + 3s of transition countdown
        const topicDuration = (this.topic.timer * 1000) + 2000 + this.transitionTimeout
        this.endTimer = new Date().getTime() + topicDuration

        updateCb({ topic: this.topic })
        console.log(`Topic ${ this.topic.id } démarré`)
    }

    showScores() {
        this.currentScreen = GameScreen.LEADERBOARD
        this.topic = null
        this.topicIndex = null
    }

    reinitTopic(id: number) {
        this.topicIndex = this.allTopics.findIndex(t => t.id == id)
        this.allTopics[this.topicIndex].status = GamePlayerStatus.WAITING
    }

    finishTopic(updateCb: (options: GameUpdateOptions) => void) {
        this.topic.status = GamePlayerStatus.FINISHED
        this.currentScreen = GameScreen.AFTER_GAME
        updateCb({ topic: this.topic })
        console.log(`Topic ${ this.topic.id } terminé`)
    }

    addTimeToTopic(time: number) {
        this.endTimer += time * 1000
    }

    calculateCompletion(code: string): Promise<number> {
        return new Promise(resolve => {
            let resolvedCount = 0

            Promise.allSettled(
                this.topic.tests.map((test: Test) =>
                    testRunner.runTest(code, test.inputs, test.output)
                        .then(result => {
                            resolvedCount++
                            return result
                        })
                )
            ).then((_) => {
                resolve(resolvedCount / this.topic.tests.length)
            })
        })
    }

    calculateScore() {
        this.topic.status = GamePlayerStatus.SCORE_CALCULATED
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
        return { ...this }
    }

    _setTransitionTimeout(timeout: number) {
        this.transitionTimeout = timeout
        setTimeout(() => {
            this.transitionTimeout = 0
        }, timeout)
    }
}

export default Game