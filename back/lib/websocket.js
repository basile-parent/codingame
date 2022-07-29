// const fs = require('fs');
// const {buildDownloadUrl} = require("../constants");
// const {EXPORT_FOLDER} = require("../constants");
let USERS = [];

// const WS_STATUS = {
//   DOWNLOADING: "DOWNLOADING",
//   WAITING: "WAITING"
// }

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
    USERS.push({ socket, io });

    console.log("New user")

    //
    // socket.on('set_login', login => {
    //   if (!login) {
    //     console.error("No login passed on set_login WS channel");
    //     return;
    //   }
    //
  56//   let user = getUser(login);
    //   if (!user) {
    //     const index = USERS.findIndex(u => u.socket === socket);
    //     user = USERS[index];
    //     user.login = login;
    //     user.status = WS_STATUS.WAITING;
    //
    //
    //     const folderPath = `${ EXPORT_FOLDER }/${login}/`;
    //     if (fs.existsSync(folderPath)) {
    //       try {
    //         const videos = fs.readdirSync(folderPath);
    //
    //         user.videos = videos.map(fileName => ({
    //           fileUrl: buildDownloadUrl(getFileNameWithoutExtension(fileName), getExtension(fileName), login),
    //           fileName,
    //           title: fileName,
    //           extension: getExtension(fileName)
    //         }));
    //       } catch (err) {
    //         console.error("Error while trying to list videos for user " + login, err);
    //       }
    //     }
    //
    //     USERS[index] = user;
    //   }
    //
    //   socket.emit("status", JSON.stringify({ status: user.status, videos: user.videos }));
    //
    //   logUsers();
    // });
    //
    // socket.on('disconnect', () => {
    //   const index = USERS.findIndex(u => u.socket === socket);
    //   if (index < 0) {
    //     return;
    //   }
    //   const user = USERS[index];
    //   console.log(user.login ? socket.login + " disconnected" : "Unknown user disconnected");
    //   USERS = USERS.filter(p => p.login !== user.login);
    //
    //   logUsers();
    // });
  });
};

const logUsers = () => {
  console.debug(`There is ${ USERS.length } users : ${ USERS.map(u => u.login).join(", ") || "-" }`);
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
