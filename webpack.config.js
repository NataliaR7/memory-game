const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sql = require('mssql');

const configDB = {
    user: 'MG_login',
    password: '123',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'memory-game-db',
}

sql.on('error', err => {
    console.log('err1')
})

sql.connect(configDB)
.then(pool => {
    return pool.request()
        //.input('input_parameter', sql.Int, value)
        .query('select Count(*) as [Количество] from Users')
}).then(result => {
    console.log(result)
    console.log('result')
}).catch(err => {
    console.log(err)
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        compress: true,
        port: 9000,
        before: function (app, server, compiler) {    
            app.use(bodyParser.json());
            app.use(cookieParser());

            app.get('/api', function (req, res) {
                console.log('DIMA1');
                res.json('111');
            });

            app.post('/*', function (req, res) {
                console.log(req.body);
                res.cookie('MyCookie', req.body);
                //console.log(req);
                res.json('222');
            });
        },
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
