const path = require('path')

module.exports = env => {
  return {
    mode: env || 'production',
    entry: './src/vidbg.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'vidbg.js',
      library: 'vidbg',
      libraryTarget: 'var',
      libraryExport: 'default'
    },
    devtool: 'none',
    module: {
      rules: [
        {
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          },
          test: /\.js$/

        }
      ]
    },
    plugins: []
  }
}
