const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const WebSocket = require('ws');

let currentLevel = '1';
let sql = null;

function routes(app, sqlConnect, wss) {
    sql = sqlConnect;
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.get('/users', function (req, res) {
        currentLevel = req.cookies.CurrentLevel;
        if (currentLevel.length != 1) {
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
        const responce = getCurrentUser(username);
        responce
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
            const request = pool.request();
            request.input('name', req.body.username);
            return request.query(`Insert [memory-game-db]..Users(username) Values(@name)`);
        })
            .then((result) => {
                res.json(result);
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
}

function getUsersForLeaderboard() {
    const result = sql.then((pool) => {
        return pool
            .request()
            .query(`Select * from [memory-game-db]..Users Order by max_score_level${currentLevel} DESC`);
    });
    return result;
}

function getCurrentUser(username) {
    return sql.then((pool) => {
        const request = pool.request();
        request.input('name', username);
        return request.query(`Select * from [memory-game-db]..Users Where username = @name`);
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

function broadcastAllClients(wss) {
    const responce = getUsersForLeaderboard();
    responce.then((result) => {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(result.recordset));
            }
        });
    });
}

exports.routes = routes;
exports.broadcastAllClients = broadcastAllClients;
