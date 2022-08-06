import Topic from "../types/Topic";
import {GamePlayer} from "../types/GamePlayer"
import * as fs from "fs"
import GameScreen from "../types/GameScreen"

class Game {
  public screen: GameScreen
  public allTopics: Topic[]
  public topic: Topic | null = null
  public topicIndex: number | null = null
  public endTimer: number | null = null

  constructor() {
    this.screen = GameScreen.LANDING_PAGE
    this.topicIndex = 0
    this.allTopics = this._initTopics()
  }

  _initTopics(): Topic[] {
    const allFiles = fs.readdirSync("./topics")
    return allFiles.filter(fileName => fileName.endsWith(".json"))
      .map(fileName => JSON.parse(String(fs.readFileSync(`./topics/${fileName}`))))
  }

  startGame() {
    this.screen = GameScreen.GAME_EDITOR
    this.topic = this.allTopics[this.topicIndex]
    this.endTimer = new Date().getTime() + (this.topic.timer * 1000)
  }

  toJson() {
    let game = null
    if (this.topic) {
      game = {
        endTimer: this.endTimer,
        topic: {
          ...this.topic,
          points: undefined,
          maxPointsTimer: undefined,
          tests: this.topic.tests.filter(test => !test.hidden)
        },
      }
    }

    return {
      screen: this.screen,
      game
    }
  }
}

export default Game