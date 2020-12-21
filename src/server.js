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
        console.log('DIMA1');
        sql.then((pool) => {
            return pool.request().query('Select * from Users Order by max_score DESC');
        })
            .then((result) => {
                console.log(result);
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
            return pool.request().query(`Insert [memory-game-db]..Users(username, password_hash) Values('${req.body.username}', '${req.body.password}')`);
        })
            .then((result) => {
                console.log(result);
                if(result.rowsAffected != 0) {
                    //wss.send(JSON.stringify(result.recordset));
                    console.log("result00000");
                    broadcastAllClients(wss);
                }
                //res.json(result.recordset);
            })
            .catch((err) => {
                console.log(err);
            });

    });

    // server.listen(9000, function () {
    //     console.log('listening on localhost:9000!!!!!!!!!!!!');
    // });

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

function broadcastAllClients(wss) {
    sql.then((pool) => {
        return pool.request().query('Select * from Users Order by max_score DESC');
    }).then((result) => {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                console.log('ded22222222222');
                client.send(JSON.stringify(result.recordset));
            }
        });
    });
}

module.exports = routes;
