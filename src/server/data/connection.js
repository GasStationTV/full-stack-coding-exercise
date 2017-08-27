import mongoose from 'mongoose';
import fs from 'fs';

export function setupConnection(){
  const configPath='./config.json';
  const parsedConfig = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
  const hostName=parsedConfig.hostName;
  const port=parsedConfig.port;
  const db=parsedConfig.db;
  const user=parsedConfig.user;
  const pwd=parsedConfig.pwd;
  const authSource=parsedConfig.authSource;
  const connectUri='mongodb://'+user+':'+pwd+'@'+hostName+':'+port+'/'+db+'?authSource='+authSource;
  console.log("Connection URI "+connectUri);
  const promise = mongoose.connect(connectUri, {
    useMongoClient: true
  });
  return promise;
}
