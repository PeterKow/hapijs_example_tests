/**
 * Created by Peter on 06/09/15.
 */
var Joi = require('joi');
var Q = require('q');

exports.register = function(server, options, next){

  server.route({
    method: 'GET',
    path: '/stock/{id}',
    config: {
      validate: {
       params: {
         id: Joi.string().min(4).required()
       }
      }
    },
    handler: function(request, reply){

      var getStockById = Q.nbind(server.methods.getStockById);

      getStockById(request.params.id)
        // it's not an accidence that we have only catch - node promise
        .catch(reply);
    }
  });

  server.route({
    method: 'GET',
    path: '/stock',
    handler: function(request, reply){

      var getAllStock = Q.nbind(server.methods.getAllStock);
      getAllStock()
        .catch(reply);
    }
  });

  server.route({
    method: 'DELETE',
    path: '/stock/{id}',
    config: {
      validate: {
        params: {
          id: Joi.string().min(4).required()
        }
      }
    },
    handler: function(request, reply){

      var deleteStockById = Q.nbind(server.methods.deleteStockById);
      deleteStockById(request.params.id)
        .then(successReply)
        .catch(reply);

      function successReply(){
        return reply().code(204);
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'stocks'
};