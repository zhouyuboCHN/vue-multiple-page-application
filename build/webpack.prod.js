var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HTMLPlugin = require('html-webpack-plugin')
var getEntryFiles = require('./util.js').getEntryFiles

// 设定需要抽取的第三方代公共代码
var map  = getEntryFiles([
  'vue',
  'axios'
])

module.exports = {
  entry:map.entrys,
  output: {
    path: path.resolve(__dirname, '../prod_dist'),
    publicPath: '',
    filename: '[name].build.[hash:4].js'
  },
  module: {
    rules: [
      {
        test:/\.scss$/,
        use:ExtractTextPlugin.extract({
          fallback:{
            loader:'style-loader',
          },
          // 提取前处理的loader
          use:[
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
        })
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
        use:[
          {
            loader:'url-loader',
            options:{
              name:'[name].[hash:4].[ext]',
              // 图片小于8k都会转成base64编码
              limit:8000,
              useRelativePath:true,
            }
          }
        ]
      },
      {
        test:/\.(eot|woff2?|ttf|svg|woff)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              name:'[name].[hash:4].[ext]',
              // 小于5kb才以base64方式写入css
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
      'vue': path.resolve(__dirname,'../node_modules/vue/dist/vue.runtime.min.js'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  // devtool:'#source-map',
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin('styles.[contentHash:4].css'),
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
      template:path.join(__dirname,'./template.html'),
      inject:true,
      chunks:['vendor',unit.name],
      title:unit.title
    })
  )
})

module.exports.plugins = module.exports.plugins.concat(htmlPlugins)
