/**
 * Created by Peter on 06/09/15.
 */
var Boom = require('boom');
var _ = require('lodash');
var db = require('./db');

exports.register = function(server, options, next){

  server.method('getStockById', getStockById);
  server.method('getAllStock', getAllStock);
  next();
};

exports.register.attributes = {
  name: 'stockModel'
};

function getAllStock(next){
  return next(db);
}

function getStockById(id, next) {

  var index = _.findIndex(db, function(stock){
    return stock.id === id
  });

  if(index === -1 ) {
    throw Boom.notFound('Stock id: ' + id + ' not found');
  }

  return next(db[index]);

}