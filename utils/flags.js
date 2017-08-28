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

module.exports = {
  getValidFlagTypes
};
