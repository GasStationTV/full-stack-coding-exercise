import R from 'ramda'
import TestData from '../test-data.seed'

describe('routes/site.js', function() {

  describe('[GET] : /site', function() {
    it('expect to return all the sites with site flags', function(done) {
      request
        .get('/site')
        .then(result => {
          const { res } = result
          const expected_site_flag = {
            _id: '59f8c7a2883f193d50ef03c6',
            flag: {
              _id: '59f8c771f78e47a23a3f01f5',
              __v: 0,
              type: 'advertise'
            },
            end_date: null,
            start_date: null
          }

          expect(result).to.have.status(200)
          expect(res.body.length).to.equal(2)
          expect(res.body[0].site_flags[0]).to.deep.equal(expected_site_flag)

          done()
        })
        .catch(done)
    })
  })

  describe('[PUT] : /site/:id/flag/:site_flag_id', function() {
    it('expect 404 error that the site flag id not found', function(done) {
      request
        .put(`/site/${TestData.site[0]._id}/flag/${TestData.site_flag[1]._id}`)
        .catch(result => {
          const { response } = result
          const expected_body = {
            "code": "site_flag_id not found",
            "message": "site(59f40c812539f15bdcd1d0ab) does not have site flag id(59f8c7ac883f193d50ef03c7)"
          }

          expect(result).to.have.status(404)
          expect(response.body).to.deep.equal(expected_body)
          done()
        })
        .catch(done)
    })
  })
})
