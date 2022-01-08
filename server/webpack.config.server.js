const nodeExternals = require('webpack-node-externals')
const path = require('path')
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    name: 'server',
    entry: {
        server: path.resolve(__dirname, 'server.tsx'),
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    externals: [nodeExternals()],
    target: 'node',
    node: {
        __dirname: false,
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                configFile: 'tsconfig.server.json',
            },
        }, {
            test: /\.css$/,
            use: [
                "css-loader",
            ],
        }],
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
    ]
}