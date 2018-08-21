var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HTMLPlugin = require('html-webpack-plugin')
var getEntryFiles = require('./build/util.js').getEntryFiles

// 设定需要抽取的第三方代公共代码
var map  = getEntryFiles([
  'vue',
  'axios'
])

module.exports = {
  entry: map.entrys,
  output: {
    path: path.resolve(__dirname, ''),
    publicPath: '',
    filename: '[name].build.js'
  },
  module: {
    rules: [
      {
        test:/\.scss$/,
        use:[
          {
            loader:'style-loader'
          },
          {
            loader:'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader:'postcss-loader',
            options:{
              ident:'postcss',
              plugins:[
                // require('autoprefixer')
                // postcss-next 就包括autoprefixer 所以上面的注释掉
                require('postcss-cssnext')
              ]
            }
          },
          {
            loader:'sass-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitepace:true,
          extractCSS: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath:'imgs',
          name: '[name].[ext]?[hash]',
          useRelativePath:true
        }
      },
      {
        test:/\.(eot|woff2?|ttf|svg|woff)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              name:'[name].[hash:4].[ext]',
              // 小于5kb以base64方式写入css
              limit:5000,
              useRelativePath:true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port:8866
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new ExtractTextPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    })
  ]
}

// 生成htmlplugin
var htmlPlugins = []
map.content.forEach((unit)=>{
  htmlPlugins.push(
    new HTMLPlugin({
      filename:unit.name+'.html',
      template:path.join(__dirname,'./build/template.html'),
      inject:true,
      chunks:['vendor',unit.name],
      title:unit.title
    })
  )
})

module.exports.plugins = module.exports.plugins.concat(htmlPlugins)

