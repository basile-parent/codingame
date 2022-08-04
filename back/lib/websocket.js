const Game = require("./Game");

let ADMINS = [];
let PLAYERS = [];

const GAME = new Game()

const getLeaderboard = () => {
  return PLAYERS.filter(p => p.data.name).map(p => ({...p.data, uuid: undefined}))
}

const createWebSocketServer = http => {
  const {Server} = require("socket.io");
  const io = new Server(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["X-mode"]
    }
  });

  // const io = require('socket.io').(http, {
  //   cors: {
  //     origin: "http://localhost:8080",
  //     methods: ["GET", "POST"]
  //   }
  // });

  io.on('connection', socket => {
    const mode = socket.handshake.headers["x-mode"]
    if (mode === "ADMIN") {
      ADMINS.push({socket, io, data: {}})
    } else {
      PLAYERS.push({socket, io, data: {score: 0}})
    }

    socket.emit('status', GAME.toJson())
    socket.emit('leaderboard', getLeaderboard())

    socket.on("setUuid", uuid => {
      // Remove duplicates (for development mode)
      let uuidPlayers = PLAYERS.filter(p => p.socket === socket)
      while (uuidPlayers.length > 1) {
        const index = PLAYERS.findIndex(p => p.socket === socket)
        PLAYERS.splice(index, 1)
        uuidPlayers = PLAYERS.filter(p => p.socket === socket)
      }

      if (!uuidPlayers.length) {
        console.log(PLAYERS)
        return;
      }

      const index = PLAYERS.findIndex(p => p.socket === socket)
      const player = PLAYERS[index]
      player.data.uuid = uuid

      logPlayers()
      broadcast('leaderboard', getLeaderboard())
    })

    socket.on("setName", (uuid, name) => {
      const index = PLAYERS.findIndex(p => p.data.uuid === uuid)
      const player = PLAYERS[index]
      player.data.name = name

      logPlayers()
      broadcast('leaderboard', getLeaderboard())
    })

    socket.on('disconnect', () => {
        const index = PLAYERS.findIndex(p => p.socket === socket)
        if (index >= 0) {
          const player = PLAYERS[index]
          console.log(`${player.data.name || player.data.uuid || "Unknown player"} disconnected`)
          PLAYERS = PLAYERS.filter(p => p.socket !== socket)
        } else {
          const indexAdmin = ADMINS.findIndex(p => p.socket === socket)
          if (indexAdmin >= 0) {
            console.log("Admin disconnected")
            ADMINS = ADMINS.filter(a => a.socket !== socket)
          } else {
            console.log("Unfound player disconnected")
            return
          }
        }

        broadcast('leaderboard', getLeaderboard())
        logPlayers();
      }
    );




    socket.on("startGame", (uuid, name) => {
      GAME.startGame()
      broadcast('status', GAME.toJson())
      console.log("Partie démarrée")
    })


  });
};

const logPlayers = () => {
  const adminLabel = ADMINS.length > 0 ? `${ADMINS.length} admin${ADMINS.length > 1 ? "s" : ""}` : ""
  const playerLabel = PLAYERS.length > 0 ? `${PLAYERS.length} player${PLAYERS.length > 1 ? "s" : ""} : ${PLAYERS.map(u => u.data.name || u.data.uuid).join(", ") || "-"}` : ""
  const labels = [adminLabel, playerLabel].filter(label => label)
  if (labels.length) {
    console.debug(`There is ${labels.join(", ")}`);
  } else {
    console.debug("There is nobody");
  }
};

const broadcast = (...args) => {
  ADMINS.forEach(a => a.socket.emit(...args))
  PLAYERS.forEach(p => p.socket.emit(...args))
}

// const sendMessageToUser = (login, topic, message) => {
//   const user = getUser(login);
//   if (user) {
//     console.debug(`Sending message to user [${ login }] on topic [${ topic }].`)
//     user.socket.emit(topic, message);
//   } else {
//     console.error(`Cannot send message to user [${ login }] : not connected to server.`)
//   }
// };

module.exports = {
  createWebSocketServer,
  // sendMessageToUser,
};
