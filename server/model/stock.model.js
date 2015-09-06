/**
 * Created by Peter on 06/09/15.
 */

exports.register = function(server, options, next){

  server.method('getStockById', getStockById);

  next();
};

exports.register.attributes = {
  name: 'stockModel'
};

function getStockById(id, callback){
  console.log('got it!', id);
  callback(id);
}