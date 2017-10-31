import Types from './action-types'
import Api from '../lib/api'

const getAll = () => dispatch => Api
  .get('flag')

  .then(res => dispatch({type: Types.RECEIVED_FLAGS, payload: res.data}))


export default {
  getAll
}
