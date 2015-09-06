/**
 * Created by Peter on 06/09/15.
 */
var Confidence = require('confidence');

var config = {
  connections: {
    port: 8000
  }
};

var store = new Confidence.Store(config);

exports.get = function(key){
  return store.get(key);
};