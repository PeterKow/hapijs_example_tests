/**
 * Created by Peter on 06/09/15.
 */
var Joi = require('joi');

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
      reply();
    }
  });

  next();
};

exports.register.attributes = {
  name: 'stocks'
};