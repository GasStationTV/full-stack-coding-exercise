import Router from 'koa-router'
import BodyParser from 'koa-body'

import Middleware from '../middleware'
import Validator from '../validator'

const routes = () => {
  const router = new Router()

  router.param('id', Middleware.site.param)
  router.param('site_flag_id', Middleware.site.siteFlagParam)

  router.post('/', BodyParser(), Middleware.site.create)

  router.get('/', Middleware.site.getAll)

  router.get('/:id', Middleware.site.getById)

  router.post('/:id/flag',
    BodyParser(), Validator.site.site_flag, Middleware.site.addFlag
  )

  router.put('/:id/flag/:site_flag_id',
    BodyParser(), Validator.site.site_flag, Middleware.site.updateFlag
  )

  router.delete('/:id/flag/:site_flag_id', Middleware.site.delFlag)

  return router.routes()
}

export default routes
