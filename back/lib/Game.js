const fs = require("fs")

class Game {
  screen
  topic
  topicIndex
  endTimer
  players = []

  constructor() {
    this.screen = Screen.LANDING_PAGE
    this.topicIndex = 0
    this.allTopics = this._initTopics()
  }

  _initTopics() {
    const allFiles = fs.readdirSync("./topics")
    return allFiles.filter(fileName => fileName.endsWith(".json"))
      .map(fileName => {
        return JSON.parse(fs.readFileSync(`./topics/${ fileName }`))
      })
  }

  startGame(players) {
    this.screen = Screen.GAME_EDITOR
    this.topic = this.allTopics[this.topicIndex]
    this.players = players
  }

  toJson() {
    let game = null
    if (this.topic) {
      game = {
        endTimer: new Date("2022-08-04T20:10:00").getTime(),
        players: this.players,
        topic: {
          ...this.topic,
          timer: undefined,
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

const Screen = {
  LANDING_PAGE: "LANDING_PAGE",
  GAME_EDITOR: "GAME_EDITOR",
}

module.exports = Game