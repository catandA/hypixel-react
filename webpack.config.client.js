const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    name: 'client',
    entry: {
        client: path.resolve(__dirname, 'src/index.tsx'),
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname + '/dist/static'),
        filename: '[name].[contenthash].js',
        publicPath: '',
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    target: 'web',
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.json',
                },
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(), new WebpackManifestPlugin()],
}