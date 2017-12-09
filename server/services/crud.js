module.exports = function(app) {
  var Sites = require('../models/site');

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // GET all sites
  app.get('/api/sites', function(req, res) {
    Sites.find(function(err, data) {
      if (err) res.send(err);
      res.json(data);
    });
  });

  // GET one site by id
  app.get('/api/site/:id', function(req, res) {
    var id = req.params.id;
    console.log('/api/site/:id');
    Sites.findById(id, function(err, data) {
      console.log(data);
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  // UPDATE
  app.post('/api/site/:id', function(req, res) {
    Sites.findById(req.body._id, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        const newSite = new Sites(req.body.site);
        newSite.isNew = false;
        try {
          newSite.save(function(err) {
            if (err) {
              console.log('error saving doc', err);
            } else {
              console.log('successfully saved site');
              res.json(newSite);
            }
          });
        } catch (ex) {
          throw ex;
        }
      }
    });
  });
};
