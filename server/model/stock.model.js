/**
 * Created by Peter on 06/09/15.
 */
var Boom = require('boom');
var _ = require('lodash');
var db = require('./db');

exports.register = function(server, options, next){

  server.method('getStockById', getStockById);
  server.method('getAllStock', getAllStock);
  server.method('deleteStockById', deleteStockById);

  next();
};

exports.register.attributes = {
  name: 'stockModel'
};

function getAllStock(next){
  return next(db);
}

function deleteStockById(id, next) {

  var index = findStockById(id);
  checkIndex(index, id);

  var result = db[index];
  db.splice(index, 1);

  return next(null, result);
}

function getStockById(id, next) {

  var index = findStockById(id);
  checkIndex(index, id);

  return next(db[index]);
}

function checkIndex (index, id) {
  if(index === -1 ) {
    throw Boom.notFound('Stock id: ' + id + ' not found');
  }
}

function findStockById(id){
  return _.findIndex(db, function(stock){
    return stock.id === id
  });
}