/**
 * Created by Peter on 06/09/15.
 */
var config = require('./config.js');

var manifest = {
  server: {
    debug: {
      request: ['error']
    }
  },
  connections: [ config.get('/connections') ],
  plugins: {
  }
};

module.exports = manifest;