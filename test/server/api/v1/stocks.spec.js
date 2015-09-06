/**
 * Created by Peter on 06/09/15.
 */
var Lab = require('Lab');
var lab = exports.lab = Lab.script();
var Code = require('code');
var Hapi = require('hapi');
var path = require('path');
var base = process.env.PWD;
var config = require(path.join(base,  './config'));
var ProjectPlugin = require(path.join(base,  '/server/api/v1/stocks'));
var ModelPlugin = require(path.join(base,  '/server/model/stock.model'));

var server;
var request = {};

function getStockRequest(id){
  return {
    method: 'GET',
    url: '/stock/' + id
  };
}

lab.beforeEach(function(done){

  var plugins = [ProjectPlugin, ModelPlugin];

  server = new Hapi.Server();
  server.connection({ port: config.get('/connections/port') });
  server.register(plugins, function (err) {
    if (err) { return done(err);}
    done();
  });

});

lab.experiment('GET stock/{id}', function(){

  lab.beforeEach(function(done) {

    var stockId = '0001';
    request = getStockRequest(stockId);

    done();
  });

  lab.test('Should return successful response', function(done){
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      done();
    })
  });

  lab.test('Should return error response for shorter than 4 characters id', function(done){
    request = getStockRequest('023');
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(400);
      done();
    })
  });

  lab.test('Should return 404 for undefined id', function(done){
    request = getStockRequest('XXXX');
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(404);
      done();
    })
  });


});
