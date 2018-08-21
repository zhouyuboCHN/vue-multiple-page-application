var glob = require('glob')
var path = require('path')
var pages = require('./pages.js')

function getEntryFiles(vendors){
  var entryFiles = glob.sync(path.resolve(__dirname, '../client/src')+ '/*/*.js')
  var map = {},
    entrys = {}

  vendors ? entrys['vendor'] = vendors : 0
  entryFiles.forEach((filePath) => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
      entrys[filename] = filePath
  })
  map.entrys = entrys
  map.content = pages
  return map
}

module.exports = {getEntryFiles}
