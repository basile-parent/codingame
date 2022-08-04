import * as express from "express"
const app = express()

import routes from "./routes/index"
app.use('/', routes)
import errorHandler from "./errorHandler"
app.use(errorHandler)

process.on('uncaughtException', function(err) {
  console.log( " UNCAUGHT EXCEPTION " )
  console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message )
})

import * as cors from "cors"
app.use(cors())
import * as bodyParser from "body-parser"
app.use(bodyParser.json())

/* ********** WEBSOCKETS ********** */
import { createWebSocketServer } from "./websocket/websocket-server"
import * as http from "http"
const server = http.createServer(app)
createWebSocketServer(server)

/* ********** Démarrage du serveur ********** */
const hostname = '127.0.0.1'
const port = process.env.PORT || 9090

server.listen(port, () => {
  console.log(`Server started on http://${ hostname }:${ port } at ${ new Date().toLocaleString() }`)
})