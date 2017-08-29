import express from 'express';
import bodyParser from 'body-parser';
import {setupConnection} from './data/connection'
import siteRoutes from './routes/siteRoutes'
import flagRoutes from './routes/flagRoutes'

const port = process.env.PORT || 8080;


export function setupApp(){
  const dbConnectPromise=setupConnection();
  return new Promise( (resolve, reject)=>{
      dbConnectPromise.then(()=> {
          console.log("Connected to database");
          const app = express();
          app.use('/js',express.static(process.cwd() + "/build/client"));
          app.use('/',express.static(process.cwd() + "/src/public"));
          app.use(bodyParser.urlencoded({ extended: true }));
          app.use(bodyParser.json())
          app.use('/api', siteRoutes);
          app.use('/api', flagRoutes);
          resolve(app)
      }, (error)=> {
          reject(error)
      });
  })
}

export function runServer(errCallBack,successCallBack){
    setupApp().then((expressApp)=>{
      expressApp.listen(port, ()=> {
          if(successCallBack){
            successCallBack('Listening on port '+port);
          }
      })
    },(error)=>{
      errCallBack(error);
    })

}
if(!module.parent){
  runServer((error)=>{
    console.log(error);
    process.exit()
  },(message)=>{
    console.log(message)
  })
}
