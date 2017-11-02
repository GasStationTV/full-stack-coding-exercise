import Koa from 'koa'
import Router from 'koa-router'
import Logger from 'koa-logger'
import Cors from 'koa2-cors'

import Routes from './routes'
import Services from './services'

const serve = ({env, port}) => {
  const app = new Koa()
  const router = new Router()

  app.use(Logger())
  app.use(Cors())
  app.use(Services.DB.init(env))

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
