import Router from 'koa-router'
import Middleware from '../middlewares'


const routes = () => {
  const router = new Router()

  router.get('/', Middleware.flag.getAll)

  return router.routes()
}

export default routes
