/**
 * Returns array of valid options for flag type
 */
const getValidFlagTypes = () => {
  return [
    'Advertiser - Location Priority',
    'Retailer - Location Priority',
    'Retailer - Showcase',
    'GSTV - Site Visit',
    'GSTV - Showcase',
    'GSTV - Nielsen Survey',
    'GSTV - Research Survey',
    'GSTV - Unsellable'
  ];
};

/**
 * Format errors into an array so errors can be more easily displayed
 */
const formatErrors = (err) => {
  const errors = [];

  if (err.name === 'ValidationError' && err.errors) {
    Object.keys(err.errors).forEach((key) => {
      if (err.errors[key].kind === 'required') {
        errors.push(`${key} is required`);
      } else {
        errors.push(err.errors[key].message);
      }
    });
  }

  return errors;
};

module.exports = {
  getValidFlagTypes,
  formatErrors
};
