const db = require('mssql');
const WebSocket = require('ws');
const {routes, broadcastAllClients} = require('./routes');

const configDB = {
    user: 'MG_login',
    password: '123',
    server: 'localhost',
    database: 'memory-game-db',
};
const sql = db.connect(configDB);
let  wss = null;

function server(app) {
    connectWebSocket();
    routes(app, sql, wss);
}

function connectWebSocket() {
    wss = new WebSocket.Server({
        port: 9001,
        noServer: true,
    });

    wss.on('connection', function connection() {
        broadcastAllClients(wss);
    });
}

module.exports = server;
