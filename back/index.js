const app = require('express')();

app.use('/', require('./routes'));
app.use(require("./errorHandler"));

process.on('uncaughtException', function(err) {
  console.log( " UNCAUGHT EXCEPTION " );
  console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
});

app.use(require('cors')());
app.use(require('body-parser').json());

/* ********** WEBSOCKETS ********** */
const {createWebSocketServer} = require("./lib/websocket");
const server = require('http').createServer(app);
createWebSocketServer(server);

/* ********** Démarrage du serveur ********** */
const hostname = '127.0.0.1';
const port = process.env.PORT || 9090;

server.listen(port, () => {
  console.log(`Server started on http://${ hostname }:${ port } at ${ new Date().toLocaleString() }`);
});