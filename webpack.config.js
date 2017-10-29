var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './src/home.js',
  output: {
    filename: 'home.js',
    path: path.resolve(__dirname,'dist/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      jquery: path.join(__dirname,'src/lib/jquery-3.2.1.min.js')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}