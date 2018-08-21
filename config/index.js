import development from './development.js'
import production from './production.js'

var config

if(process.env.NODE_ENV === 'production') {
  config = production
}else{
  config = development
}

export default config
