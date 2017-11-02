import * as R from 'ramda'
import Types  from './action-types'
import Api    from '../lib/api'

const getAll = () => dispatch => Api
  .get('site')

  .then(res => dispatch({type: Types.RECEIVED_SITES, payload: res.data}))


const addFlag = (site_id, request) => (dispatch, getState) => Api
  .post('site_flag', {
    keys: { site_id },
    body: request
  })

  .then(res => dispatch({
    site_id,
    type: Types.ADDED_SITE_FLAG,
    payload: R.pick(['_id', 'start_date', 'end_date', 'flag'])(res.data)
  }))


const removeFlag = (site_id, site_flag_id) => dispatch => Api
  .del('existing_site_flag', {
    keys: { site_id, site_flag_id }
  })

  .then(res => dispatch({
    site_id, site_flag_id,
    type: Types.REMOVED_SITE_FLAG,
  }))


const updateFlag = (site_id, site_flag_id, request) => dispatch => Api
  .put('existing_site_flag', {
    keys: { site_id, site_flag_id },
    body: request
  })

  .then(res => dispatch({
    site_id, site_flag_id,
    type: Types.UPDATED_SITE_FLAG,
    payload: R.pick(['_id', 'start_date', 'end_date', 'flag'])(res.data)
  }))


export default {
  getAll,
  addFlag,
  removeFlag,
  updateFlag
}
