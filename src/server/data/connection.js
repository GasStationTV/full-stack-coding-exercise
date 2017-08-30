import mongoose from 'mongoose';

export function setupConnection(parsedConfig){
  const hostName=parsedConfig.database.hostName;
  const port=parsedConfig.database.port;
  const db=parsedConfig.database.db;
  const user=parsedConfig.database.user;
  const pwd=parsedConfig.database.pwd;
  const authSource=parsedConfig.database.authSource;
  const connectUri='mongodb://'+user+':'+pwd+'@'+hostName+':'+port+'/'+db+'?authSource='+authSource;
  console.log("Connection URI "+connectUri);
  mongoose.Promise = global.Promise;
  const promise = mongoose.connect(connectUri, {
    useMongoClient: true
  });
  return promise;
}
