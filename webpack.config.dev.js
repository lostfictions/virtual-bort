const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    './src/main.tsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.tsx?$/,
        loaders: [
          "react-hot-loader/webpack",
          "awesome-typescript-loader"
        ],
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
}
