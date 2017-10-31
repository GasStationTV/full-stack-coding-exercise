describe('routes/flag-type.js', function() {

  describe('[GET]: /flag', () => {
    it('should return all the flag type', function(done) {
      request
        .get('/flag')
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
