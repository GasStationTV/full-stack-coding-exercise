import express from 'express';
import bodyParser from 'body-parser';
import {setupConnection} from './data/connection'
import siteRoutes from './routes/siteRoutes'
import flagRoutes from './routes/flagRoutes'
const app = express();
const port = process.env.PORT || 8080;

const dbConnectPromise=setupConnection();
dbConnectPromise.then(()=> {
  console.log("Connected to database");
  app.use('/js',express.static(process.cwd() + "/build/client"));
  app.use('/',express.static(process.cwd() + "/src/public"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json())
  app.use('/api', siteRoutes);
  app.use('/api', flagRoutes);
  app.listen(port, function () {
  	console.log('Listening on port '+port);
  });
}, (err)=> {
  console.log(err);
  process.exit()
});
