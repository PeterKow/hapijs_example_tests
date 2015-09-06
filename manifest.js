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
    './server/api/v1/stocks': {basePath: 'api/v1'},
    './server/model/stock.model': {basePath: 'api/v1'}
  }
};

module.exports = manifest;