module.exports = function(app) {
  // grab the site model we just created
  var Sites = require('../models/site');

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // SHOW
  app.get('/api/sites', function(req, res) {
    // use mongoose to get all Sites in the database
    Sites.find(function(err, data) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err) res.send(err);

      res.json(data); // return all Sites in JSON format
    });
  });

  // get all items from mongodb
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

  // CREATE
  app.post('/api/sites', function(req, res) {
    var formsite = {
      text: req.body.text,
      completed: req.body.completed
    };

    let newsite = new Sites(formsite);
    try {
      newsite.save();
    } catch (ex) {
      throw ex;
    }
  });

  // UPDATE
  app.post('/api/site/:id', function(req, res) {
    console.log('hello?', req.body._id);
    console.log('yes', req.body.id);
    console.log('site', req.body.site);
    Sites.findById(req.body._id, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        const newSite = new Sites(req.body.site);
        console.log('data', data);
        console.log('reaching here?', newSite);
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
