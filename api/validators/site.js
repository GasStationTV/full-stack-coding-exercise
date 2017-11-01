import Joi    from 'joi'
import Moment from 'moment'
import Util   from '../util'

const _site_flag_schema = Joi.object({
  flag: Joi.string().regex(Util.idRegex).required(),
  start_date: Joi.date().iso().allow(null),
  end_date: Joi.date().iso().allow(null)
}).rename('flag_id', 'flag')


const site_flag = async (ctx, next) => {
  const { value, error } = _site_flag_schema.validate(ctx.request.body)

  if (value.start_date && value.end_date) {
    if (Moment(value.start_date).diff(value.end_date, 'days') >= 0) {
      ctx.status = 400
      ctx.body = {
        code: 'invalid date entry',
        message: 'start_date need to be before the end_date'
      }

      return
    }
  }

  if (error) {
    ctx.status = 400
    ctx.body = error

    return
  }

  ctx.state.safe_body = value
  await next()
}

export default {
  site_flag
}
