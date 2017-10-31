import Koa from 'koa'
import Router from 'koa-router'
import Logger from 'koa-logger'
import Mongoose from 'mongoose'
import Bluebird from 'bluebird'
import Cors from 'koa2-cors'

import Routes from './routes'

const serve = ({env, port}) => {
  console.log('env: ', env)
  if (env !== 'testing') {
    Mongoose.connect('mongodb://34.208.204.136:27017/gstv', { useMongoClient: true })
    Mongoose.Promise = Bluebird

    const db = Mongoose.connection
    db.on('error', console.log.bind(console, 'connection error: '))
  }

  const app = new Koa()
  const router = new Router()

  app.use(Logger())
  app.use(Cors())

  router.use('/site', Routes.site())
  router.use('/flag', Routes.flag_type())

  app
    .use(router.routes())
    .use(router.allowedMethods());

  return app.listen(port, err => {
    if (err) {
      console.error(err )
      return
    }

    console.log('Server is listening to port: ', port)
  })
}

export default { serve }
