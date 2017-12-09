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
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('site', siteSchema);
