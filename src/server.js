const db = require('mssql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const WebSocket = require('ws');

const configDB = {
    user: 'MG_login',
    password: '123',
    server: 'localhost',
    database: 'memory-game-db',
};

const sql = db.connect(configDB);

function routes(app) {
    //const server = require('http').createServer(app);

    app.use(bodyParser.json());
    app.use(cookieParser());

    app.get('/users', function (req, res) {
        const responce = getUsersForLeaderboard();
        responce
            .then((result) => {
                res.json(result.recordset);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    app.post('/login', function (req, res) {
        console.log(req.body);
        const responce = getUsersForLeaderboard();
        responce
            .then((result) => {
                res.json(result.recordset);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    app.post('/users', function (req, res) {
        console.log(req.body);
        //res.cookie('MyCookie', req.body);
        //res.json('222');
        sql.then((pool) => {
            return pool
                .request()
                .query(
                    `Insert [memory-game-db]..Users(username, password_hash) Values('${req.body.username}', '${req.body.password}')`
                );
        })
            .then((result) => {
                console.log(result);
                if (result.rowsAffected != 0) {
                    broadcastAllClients(wss);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const wss = new WebSocket.Server({
        port: 9001,
        noServer: true,
    });

    wss.on('connection', function connection(ws) {
        // ws.on('message', function incoming(message) {
        //   ws.send(JSON.stringify(message));
        // });
        console.log('CONNECT!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        ws.on('message', function incoming(data) {
            console.log('ОТВЕТ');
            console.log('received: ', message);
        });

        broadcastAllClients(wss);
    });
}

function getUsersForLeaderboard() {
    const result = sql.then((pool) => {
        return pool.request().query('Select * from Users Order by max_score DESC');
    });
    return result;
}

function broadcastAllClients(wss) {
    const responce = getUsersForLeaderboard();
    responce.then((result) => {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                console.log('ded22222222222');
                client.send(JSON.stringify(result.recordset));
            }
        });
    });
}

module.exports = routes;
