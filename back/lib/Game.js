class Game {
  screen
  topic
  timer

  constructor() {
    this.screen = Screen.LANDING_PAGE
  }

  startGame() {
    this.screen = Screen.GAME_EDITOR
  }

}

const Screen = {
  LANDING_PAGE: "LANDING_PAGE",
  GAME_EDITOR: "GAME_EDITOR",
}

module.exports = Game