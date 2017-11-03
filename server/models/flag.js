const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flagSchema = new Schema({
  flagType: {type: String, required: true},
  startDate: String,
  endDate: String
});

const Flag = mongoose.model('Flag', flagSchema);

module.exports = Flag;
