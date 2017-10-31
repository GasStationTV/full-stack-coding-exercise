import Joi from 'joi'
import Util from '../util'

const _site_flag_schema = Joi.object({
  flag: Joi.string().regex(Util.idRegex).required(),
  start_date: Joi.date().iso().allow(null),
  end_date: Joi.date().iso().allow(null)
}).rename('flag_id', 'flag')


const site_flag = async (ctx, next) => {
  const { value, error } = _site_flag_schema.validate(ctx.request.body)

  if (error) {
    ctx.status = 400
    ctx.body = error
  } else {
    ctx.state.safe_body = value
    await next()
  }
}

export default {
  site_flag
}
