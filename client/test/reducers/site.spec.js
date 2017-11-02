import Moment from 'moment'
import R      from 'ramda'

import SiteReducer from '../../src/reducers/site'
import Action      from '../../src/actions'
import TestData    from '../test-data'

const { action_types } = Action

describe('reducers/site.js', function() {
  it('expect to return all the sites', function() {
    const action = { type: action_types.RECEIVED_SITES, payload: TestData.sites}
    const sites = SiteReducer(null, action)

    expect(sites).to.deep.equal(TestData.sites)
  })

  it('expect to not add the expired site flag', function() {
    const action = {
      type: action_types.ADDED_SITE_FLAG,
      payload: {_id: 'abc', end_date: Moment()},
      site_id: '59f40c812539f15bdcd1d0ab'
    }
    const actual = SiteReducer(TestData.sites, action)
    const expected = TestData.sites

    expect(actual).to.deep.equal(expected)
  })

  it('expect to append a new site flag to the site', function() {
     const action = {
      type: action_types.ADDED_SITE_FLAG,
      payload: {_id: 'abc', end_date: Moment().add(2, 'day').toISOString()},
      site_id: '59f40c812539f15bdcd1d0ab'
    }
    const actual = SiteReducer(TestData.sites, action)
    const expected = R.update(
      0,
      R.merge(
        TestData.sites[0],
        {site_flags: R.append(action.payload, TestData.sites[0].site_flags) }
      )
    )(TestData.sites)

    expect(actual).to.deep.equal(expected)
  })
})
