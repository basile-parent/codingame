import {Server} from "socket.io"

export const createWebSocketServer = (http, handler) => {
  const io = new Server(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["X-mode", "X-UUID"]
    }
  })

  // const io = require('socket.io').(http, {
  //   cors: {
  //     origin: "http://localhost:8080",
  //     methods: ["GET", "POST"]
  //   }
  // })

  io.on('connection', socket => {
    handler.connect(socket)
  })
}
