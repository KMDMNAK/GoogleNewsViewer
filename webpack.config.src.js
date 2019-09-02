const merge = require('webpack-merge') // webpack-merge
const common = require('./webpack.config.js') // 汎用設定をインポート
const path = require('path');

module.exports = merge(common, {
    entry: {
        main: './src/extension.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].entry.js',
        devtoolModuleFilenameTemplate: '../[resource-path]',
        libraryTarget: 'commonjs2',
    }
})