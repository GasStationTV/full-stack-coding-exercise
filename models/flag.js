const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;
const validFlagTypes = require('../utils/flags').getValidFlagTypes();

const flagSchema = new Schema({
  // This will mock the unique ID for a site
  site_id: {
    type: Number
  },
  type: {
    type: String,
    required: true,
    validate: {
      /**
       * Validate that the selected type is valid
       */
      validator: (val) => {
        if (validFlagTypes.indexOf(val) !== -1) {
          return true;
        }

        return false;
      },
      message: 'Type must be a valid option'
    }
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  }
});

/**
 * There didn't appear to be a way to get the entire object in a custom
 * validator in mongoose so the validation for the date will be done in the
 * pre-validate hook
 */
flagSchema.pre('validate', function (next) {
  // Ensure start_date is before end_date
  if (this.start_date && this.end_date) {
    const startDate = moment(this.start_date);
    const endDate = moment(this.end_date);

    if (startDate >= endDate) {
      next(Error('Start Date must be before End Date'));
    }
  }

  next();
});

/**
 * Mimic foreign key data for a site
 * Generating random number between 1 and 10
 */
flagSchema.pre('save', function (next) {
  this.site_id = Math.floor(Math.random() * 10) + 1;

  next();
});

const Flag = mongoose.model('Flag', flagSchema);

module.exports = Flag;
