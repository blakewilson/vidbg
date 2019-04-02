const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/vidbg.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vidbg.js',
    library: 'vidbg',
    libraryTarget: 'var'
  },
  devtool: 'none',
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: []
}
