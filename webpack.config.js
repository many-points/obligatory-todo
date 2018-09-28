const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    publicPath: '/scripts/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  }
};
