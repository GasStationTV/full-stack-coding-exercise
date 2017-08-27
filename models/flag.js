const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const flagSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  }
});

flagSchema.pre('validate', function (next) {
  // Ensure start_date is before end_date
  if (this.start_date && this.end_date) {
    const startDateUnix = moment(this.start_date);
    const endDateUnix = moment(this.end_date);

    if (startDateUnix >= endDateUnix) {
      next(Error('Start Date must be before End Date'));
    }
  }

  next();
});

const Flag = mongoose.model('Flag', flagSchema);

module.exports = Flag;
