const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  flags: [
    {
      type: { type: String, required: true },
      startDate: { type: Date },
      endDate: { type: Date }
    }
  ],
  name: { type: String, required: true },
  address: { type: String }
});

module.exports = mongoose.model('site', siteSchema);
