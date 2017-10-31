import R from 'ramda'
import Bluebird from 'bluebird'

import Model from '../models'

const param = async (id, ctx, next) => {

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.status = 400
      ctx.body = {
        code: 'Invalid Id',
        message: 'id must be a single string of 12 bytes'
      }

      return null
    }

    const site = await Model.site.findById(id)
      .populate({
        path: 'site_flags',
        select: 'flag start_date end_date',
        populate: { path: 'flag' }
      })

    if (!site || site.deleted_at) {
      ctx.status = 404
      ctx.body = {
        code: 'id not found',
        message: `id(${id}) is not found`
      }

      return null
    }

    ctx.state = { site }
    await next()
  } catch (err) {
    throw err
  }
}


const siteFlagParam = async (site_flag_id, ctx, next) => {
  const { site } = ctx.state
  const has_site_flag_id = R.compose(
    R.contains(site_flag_id),
    R.map(flag => flag._id.toString())
  )(site.site_flags)

  if (has_site_flag_id) {
    await next()
  } else {
    ctx.status = 404
    ctx.body = {
      code: 'site_flag_id not found',
      message: `site(${site._id}) does not have site flag id(${site_flag_id})`
    }
  }
}


const create = async ctx => {
  const new_site = await Model.site.create(ctx.request.body)

  ctx.body = new_site
}


const getById = ctx => { ctx.body = ctx.state.site }


const getAll = async ctx => {
  try {
    const sites = await Model.site.find({deleted_at: null})
      .populate({
        path: 'site_flags',
        select: 'flag start_date end_date',
        match: {
          $or: [
            { end_date: { $gt: new Date() } },
            { end_date: null }
          ],
          deleted_at: null
        },
        populate: { path: 'flag' }
      })

    ctx.body = sites
  } catch (err) {
    throw err
  }
}


const addFlag = async ctx => {
  const { site, safe_body } = ctx.state

  try {
    const new_site_flag = await Model.site_flag.create(safe_body)
    const update = R.compose(
      R.objOf('site_flags'),
      R.append(new_site_flag._id),
      R.pluck('_id'),
      R.tap(console.log)
    )(site.site_flags)

    const updated = await Bluebird.props({
      _: Model.site.findByIdAndUpdate(site._id, update, {new: true}),
      site_flag: Model.site_flag.findById(new_site_flag._id).populate('flag')
    })

    ctx.body = updated.site_flag
  } catch (err) {
    throw err
  }
}


const updateFlag = async ctx => {
  const { safe_body } = ctx.state
  const { site_flag_id } = ctx.params

  try {
    await Model.site_flag
      .findByIdAndUpdate(site_flag_id, safe_body, {new: true})

    const site_flag = await Model.site_flag
      .findById(site_flag_id).populate('flag')

    ctx.body = site_flag
  } catch (err) {
    throw err
  }
}


const delFlag = async ctx => {

  try {
    const site_flag = await Model.site_flag
      .findByIdAndUpdate(
        ctx.params.site_flag_id, {deleted_at: new Date()}, {new: true}
      )

    ctx.body = site_flag
  } catch (err) {
    throw err
  }
}


export default {
  param,
  siteFlagParam,

  create,
  getById,
  getAll,
  addFlag,
  delFlag,
  updateFlag,
}
