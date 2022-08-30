import * as express from "express"
const app = express()

/* ********** SERVER CONFIGURATION ********** */
import * as cors from "cors"

const allowedOrigins = [
    /http:\/\/(www\.)?127\.0\.0\.1:5173(\/[a-z0-9\.]*)?/,
    /http:\/\/(www\.)?localhost:5173(\/[a-z0-9\.]*)?/,
    /https:\/\/(www\.)?([a-z0-9\.]*\.)?basileparent\.fr(\/[a-z0-9\.]*)?/
]
const corsOptions = {
    origin: (origin, callback) => {
        // if (!origin) return callback(null, true) // allow requests with no origin (like mobile apps or curl requests)
        if (!allowedOrigins.some(regex => regex.test(origin))) {
            const msg = `The CORS policy for this site does not allow access from this origin: ${origin}.`
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}
app.use(cors(corsOptions))

import router from "./routes/index"

app.use('/', router)

import * as bodyParser from "body-parser"

app.use(bodyParser.json())

import errorHandler from "./errorHandler"

app.use(errorHandler)

process.on('uncaughtException', function (err) {
    console.log(" UNCAUGHT EXCEPTION ")
    console.log("[Inside 'uncaughtException' event] " + err.stack || err.message)
})
/* ********** END SERVER CONFIGURATION ********** */

/* ********** WEBSOCKETS ********** */
import {createWebSocketServer} from "./websocket/websocket-server"
import * as http from "http"
import webSocketHandler from "./websocket/websocket-handler"

const server = http.createServer(app)
createWebSocketServer(server, webSocketHandler)
/* ********** END WEBSOCKETS ********** */

/* ********** Démarrage du serveur ********** */
const hostname = '127.0.0.1'
const port = process.env.PORT || 9090

server.listen(port, () => {
    console.log(`Server started on http://${hostname}:${port} at ${new Date().toLocaleString()}`)
})