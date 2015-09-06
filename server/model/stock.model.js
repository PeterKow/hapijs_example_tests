/**
 * Created by Peter on 06/09/15.
 */
var Boom = require('boom');

exports.register = function(server, options, next){

  server.method('getStockById', getStockById);
  next();
};

exports.register.attributes = {
  name: 'stockModel'
};

var db = {
  "0001" : {
    "name": "Widget",
    "price": "2.54"
  }
};


function getStockById(id, next) {
  console.log(id, db[id]);

  if (db[id]) {
    return next(db[id]);
  }

  throw Boom.notFound('Stock id: ' + id + ' not found');

}