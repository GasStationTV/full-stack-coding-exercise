describe('routes/site.js', function() {

  describe('[GET]: /site', function() {
    it('expect to return all the sites', function(done) {
      request
        .get('/site')
        .then(response => {
          const { res } = response
          expect(response).to.have.status(200)
          expect(res.body.length).to.equal(2)

          done()
        })
        .catch(done)
    })
  })
})
