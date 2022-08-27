import Topic, {Test} from "../types/Topic";
import * as fs from "fs"
import GameScreen from "../types/GameScreen"
import {GamePlayerStatus} from "../types/GamePlayer";
import testRunner from "./testRunner";
import {GameUpdateOptions} from "./websocket-handler";
import PersistentObject from "./PersistentObject";
import topicUtils from "../utils/topicUtils";

export const TIME_MARGIN = 2000;
export const TRANSITION_TIMEOUT = 3000;

class Game extends PersistentObject {
    public started: boolean
    public currentScreen: GameScreen
    public allTopics: Topic[]
    public topic: Topic | null = null
    public topicIndex: number | null = null
    public endTimer: number | null = null
    public transitionTimeout: number = 0

    constructor() {
        super("Game")

        if (!this.load()) {
            this.currentScreen = GameScreen.LANDING_PAGE
            this.allTopics = this._initTopics()
            this.started = false

            this.save()
        } else {
            console.log("Partie chargée !")
        }
    }

    reset() {
        this.currentScreen = GameScreen.LANDING_PAGE
        this.allTopics = this._initTopics()
        this.started = false
        this.endTimer = null
        this.topic = null
        this.topicIndex = null
        this.endTimer = null
        this.transitionTimeout = 0
        this.save()
    }

    _initTopics(): Topic[] {
        const allFiles = fs.readdirSync("./topics")
        return allFiles.filter(fileName => fileName.endsWith(".json"))
            .map(fileName => JSON.parse(String(fs.readFileSync(`./topics/${fileName}`))))
            .map((jsonTopic: Topic) => {
                const topic = topicUtils.buildTopicFromJson(jsonTopic)
                topic.status = GamePlayerStatus.WAITING
                return topic
            })
            .sort((t1, t2) => t1.id - t2.id)
    }

    startGame() {
        this.started = true
        this.save()
    }

    startTopic(id: number, updateCb: (options: GameUpdateOptions) => void) {
        this.topicIndex = this.allTopics.findIndex(t => t.id == id)
        this.currentScreen = GameScreen.GAME_EDITOR
        this._setTransitionTimeout(TRANSITION_TIMEOUT)

        this.allTopics[this.topicIndex].startTime = new Date().getTime()
        this.topic = this.allTopics[this.topicIndex]
        this.topic.status = GamePlayerStatus.IN_PROGRESS

        // 2s of margin (instruction display) + 3s of transition countdown
        const topicDuration = this.topic.timer + TIME_MARGIN + this.transitionTimeout
        this.endTimer = new Date().getTime() + topicDuration

        updateCb({ topic: this.topic })
        console.log(`Topic ${ this.topic.id } démarré`)

        this.save()
    }

    showScores() {
        this.currentScreen = GameScreen.LEADERBOARD
        this.topic = null
        this.topicIndex = null

        this.save()
    }

    reinitTopic(id: number) {
        this.topicIndex = this.allTopics.findIndex(t => t.id == id)
        this.allTopics[this.topicIndex].status = GamePlayerStatus.WAITING

        this.save()
    }

    finishTopic(updateCb: (options: GameUpdateOptions) => void) {
        this.endTimer = new Date().getTime()
        this.topic.status = GamePlayerStatus.FINISHED
        this.currentScreen = GameScreen.AFTER_GAME
        updateCb({ topic: this.topic })
        console.log(`Topic ${ this.topic.id } terminé`)

        this.save()
    }

    addTimeToTopic(time: number) {
        this.endTimer += time * 1000
        this.save()
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
        this.save()
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

    toAdminJson(): Game {
        return { ...this }
    }

    toJson(): PersistentObject {
        return this.toAdminJson()
    }

    _setTransitionTimeout(timeout: number) {
        this.transitionTimeout = timeout
        setTimeout(() => {
            this.transitionTimeout = 0

            this.save()
        }, timeout)
    }

    loadFromJson(jsonObject: Object) {
        const json = jsonObject as Game
        Object.assign(this, json)
        this.allTopics = this.allTopics.map(t => topicUtils.buildTopicFromJson(t))
        this.topic = this.topic ? topicUtils.buildTopicFromJson(this.topic) : null
    }

}

export default Game