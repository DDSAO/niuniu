const path = require("path")

module.exports = {
    entry: path.resolve("./app.js"),
    mode: "development",
    output: {
        filename: "app.js",
        path: path.resolve("./dist/")
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".js", ".json", ".ts", '.tsx']
    },
    module: {
        rules: [{
            test: /\.css/,
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ]
    }
}