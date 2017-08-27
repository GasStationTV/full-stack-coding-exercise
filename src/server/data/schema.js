import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);

const flagSchema = new mongoose.Schema({
  startDate:String,
  flagType:String,
  endDate:String
});

const sitesSchema=new mongoose.Schema({
    name:String,
    address:String,
    flags:[flagSchema]
  }
);

sitesSchema.plugin(autoIncrement.plugin, 'SiteSchema');
module.exports = mongoose.model('SiteSchema', sitesSchema);
