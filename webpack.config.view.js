const merge = require('webpack-merge') // webpack-merge
const common = require('./webpack.config.js') // import common webpack config
const path = require('path');

module.exports = merge(common, {
    entry: {
        view: "./src/webview/App.tsx"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].entry.js',
        devtoolModuleFilenameTemplate: '../[resource-path]',
        library: 'MyLibrary'
    }
})