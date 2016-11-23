var path = require('path');
module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'app.js',
    path: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./node_modules")]
  }
}