/**
 * Created by trepachko on 29.4.17.
 */
module.exports = {
    devtool: 'source-map',
    entry: [
        './src/main.tsx'
    ],
    output: {
        path: '/dist/',
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.vue', '.ts', '.tsx', '.js'],
        alias: { 'vue$': 'vue/dist/vue.common.js' }
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    },
    vue: {
        esModule: true
    }
};