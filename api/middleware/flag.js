import Model from '../models'

const getAll = async ctx => {
  const flag = await Model.flag.find()

  ctx.body = flag
}

export default { getAll }
