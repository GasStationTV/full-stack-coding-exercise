const dbUser = process.env.dbUser || 'gstv';
const dbPass = process.env.dbPass || 'prototype';

module.exports = {
  url: `mongodb://${dbUser}:${dbPass}@ds133746.mlab.com:33746/gstv`
};
