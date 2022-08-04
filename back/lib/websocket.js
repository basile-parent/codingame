let PLAYERS = [];

const getLeaderboard = () => {
  return PLAYERS.filter(p => p.name).map(p => ({ ...p.data, uuid: undefined } ))
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
    PLAYERS.push({ socket, io, data: {} })

    console.log("New user")

    socket.on("setUuid", uuid => {
      console.log("New uuid", uuid)

      const index = PLAYERS.findIndex(u => u.socket === socket)
      const player = PLAYERS[index]
      player.data.uuid = uuid
      player.data.points = 0

      logPlayers()
    })

    socket.on("setName", (uuid, name) => {
      console.log("New name", uuid, name)

      const index = PLAYERS.findIndex(u => u.data.uuid === uuid)
      const player = PLAYERS[index]
      player.data.name = name

      logPlayers()
      socket.emit('leaderboard', getLeaderboard())
    })

    socket.on('disconnect', () => {
      const index = PLAYERS.findIndex(u => u.socket === socket)
      if (index < 0) {
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
  console.debug(`There is ${ PLAYERS.length } users : ${ PLAYERS.map(u => u.data.name || u.data.uuid).join(", ") || "-" }`);
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
