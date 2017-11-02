import * as R from 'ramda'
import Moment from 'moment'
import Action from '../actions'

const { action_types } = Action
const DEFAULT_STATE = []

// isEndInTodayAndThePast :: Object -> Bool
const isEndInTodayAndThePast = site_flag => (
  site_flag.end_date &&
  Moment(site_flag.end_date).diff(Moment(), 'days') <= 0
)

const reducers = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case action_types.RECEIVED_SITES: {
      return action.payload
    }

    case action_types.ADDED_SITE_FLAG: {
      const site_index = R.findIndex(R.propEq('_id', action.site_id))(state)
      const site = state[site_index]
      const updated_site = R.compose(
        R.merge(site),
        R.objOf('site_flags'),
        R.ifElse(
          isEndInTodayAndThePast,
          R.always(site.site_flags),
          R.append(R.__, site.site_flags)
        )
      )(action.payload)

      return R.update(site_index, updated_site, state)
    }

    case action_types.REMOVED_SITE_FLAG: {
      const site_index = R.findIndex(R.propEq('_id', action.site_id))(state)
      const site = state[site_index]
      const site_flag_index = R.findIndex(
        R.propEq('_id', action.site_flag_id), site.site_flags
      )
      const site_flags = R.remove(site_flag_index, 1)(site.site_flags)
      const updated_site = R.merge(site, {site_flags})

      return R.update(site_index, updated_site, state)
    }

    case action_types.UPDATED_SITE_FLAG: {
      const site_index = R.findIndex(R.propEq('_id', action.site_id))(state)
      const site = state[site_index]
      const site_flag_index = R.findIndex(
        R.propEq('_id', action.site_flag_id), site.site_flags
      )
      const updated_site = R.compose(
        R.merge(site),
        R.objOf('site_flags'),
        R.ifElse(
          isEndInTodayAndThePast,
          () => R.remove(site_flag_index, 1, site.site_flags),
          R.update(site_flag_index, R.__, site.site_flags),
        ),
        R.merge(site.site_flags[site_flag_index]),
      )(action.payload)

      return R.update(site_index, updated_site, state)
    }

    default: return state
  }
}

export default reducers
