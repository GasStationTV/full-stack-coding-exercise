import Model from '../models'

const getAll = async ctx => {
  try {
    const flag = await Model.flag.find()
    ctx.body = flag
  } catch (err) {
    throw err
  }
}

export default { getAll }
