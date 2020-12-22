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
let currentLevel = '1';

function routes(app) {
    //const server = require('http').createServer(app);

    app.use(bodyParser.json());
    app.use(cookieParser());

    app.get('/users', function (req, res) {
        currentLevel = req.cookies.CurrentLevel;
        if(currentLevel.length != 1) {
            currentLevel = '1';
        }
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
        const username = req.body.username;
        getCurrentUser(username)
            .then((result) => {
                if (result.rowsAffected[0] !== 0) {
                    res.cookie('CurrentUser', username);
                }
                res.json(result.recordset);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    app.post('/users', function (req, res) {
        sql.then((pool) => {
            //return pool.request().query(`Insert [memory-game-db]..Users(username) Values('${req.body.username}')`);
            const request = pool.request();
            request.input('name', req.body.username);
            return request.query(`Insert [memory-game-db]..Users(username) Values(@name)`);
        })
            .then((result) => {
                res.json(result);
                if (result.rowsAffected[0] !== 0) {
                    //broadcastAllClients(wss);
                }
            })
            .catch((err) => {
                if (err.message.includes('IX_Users')) {
                    res.json({ status: 409 });
                }
            });
    });

    app.patch('/users', function (req, res) {
        const username = req.body.username;
        const currentScore = req.body.score;
        let maxScore = 0;
        getCurrentUser(username)
            .then((result) => {
                let user = result.recordset[0];
                maxScore = getScore(user);
                if (currentScore > maxScore) {
                    updateScore(req.body.score, req.body.username, wss);
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

function getScore(user) {
    switch (currentLevel) {
        case '1':
            return user.max_score_level1;
        case '2':
            return user.max_score_level2;
        case '3':
            return user.max_score_level3;
        default:
            return user.max_score_level1;
    }
}

function getCurrentUser(username) {
    const result = sql.then((pool) => {
        const request = pool.request();
        request.input('name', username);
        return request.query(`Select * from [memory-game-db]..Users Where username = @name`);
        //return pool.request().query(`Select * from [memory-game-db]..Users Where username = '${username}'`);
    });
    return result;
}

function updateScore(score, username, wss) {
    const result = sql
        .then((pool) => {
            const request = pool.request();
            request.input('name', username);
            request.input('score', score);
            return request.query(
                `UPDATE [memory-game-db]..Users SET max_score_level${currentLevel} = @score WHERE username = @name`
            );
        })
        .then((result) => {
            if (result.rowsAffected[0] !== 0) {
                broadcastAllClients(wss);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    return result;
}

function getUsersForLeaderboard() {
    const result = sql.then((pool) => {
        return pool
            .request()
            .query(`Select * from [memory-game-db]..Users Order by max_score_level${currentLevel} DESC`);
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
