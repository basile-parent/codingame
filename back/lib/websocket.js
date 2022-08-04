let PLAYERS = [];

const getLeaderboard = () => {
  return PLAYERS.filter(p => p.data.name).map(p => ({ ...p.data, uuid: undefined } ))
}

const createWebSocketServer = http => {
  const { Server } = require("socket.io");
  const io = new Server(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // const io = require('socket.io').(http, {
  //   cors: {
  //     origin: "http://localhost:8080",
  //     methods: ["GET", "POST"]
  //   }
  // });

  io.on('connection', socket => {
    PLAYERS.push({ socket, io, data: { score: 0 } })

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
    })

    socket.on("setName", (uuid, name) => {
      const index = PLAYERS.findIndex(p => p.data.uuid === uuid)
      const player = PLAYERS[index]
      player.data.name = name

      logPlayers()
      socket.emit('leaderboard', getLeaderboard())
    })

    socket.on('disconnect', () => {
      const index = PLAYERS.findIndex(p => p.socket === socket)
      if (index < 0) {
        console.log("Unfound player disconnected")
        return
      }
      const player = PLAYERS[index]
      console.log(`${ player.data.name || player.data.uuid || "Unknown player" } disconnected`)
      PLAYERS = PLAYERS.filter(p => p.data.uuid !== player.data.uuid)

      socket.emit('leaderboard', getLeaderboard())
      logPlayers();
    });
  });
};

const logPlayers = () => {
  console.debug(`There is ${ PLAYERS.length } user${ PLAYERS.length > 1 ? "s" : "" } : ${ PLAYERS.map(u => u.data.name || u.data.uuid).join(", ") || "-" }`);
};

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
