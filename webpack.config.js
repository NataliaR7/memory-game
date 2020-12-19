const path = require('path');
const server = require('./src/server');

module.exports = {
    entry: [/* 'webpack-dev-server/client?http://localhost:9000', */ /* 'webpack/hot/only-dev-server', */ './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        compress: true,
        host: 'localhost',
        port: 9000,
        //transportMode: 'ws',
        before: (app) => {
            server(app);
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
    //externals: ["ws", "socket.io"],
};
