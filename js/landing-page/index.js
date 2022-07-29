const PLAYERS = []

for (let i = 0; i < 16; i++) {
  PLAYERS.push(new Player("Joueur " + (i+1)))
}


const showPlayers = () => {
  document.querySelector("#waiting-player-list ul").innerHTML =
    PLAYERS.map(p => `<li>${ p.render() }</li>`).join("")
}

showPlayers()