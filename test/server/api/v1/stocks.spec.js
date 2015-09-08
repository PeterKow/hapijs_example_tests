/**
 * Created by Peter on 06/09/15.
 */
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');
var Hapi = require('hapi');
var Path = require('path');
var Proxyquire = require('proxyquire');
var base = process.env.PWD;
var config = require(Path.join(base,  './config'));
var ProjectPlugin = require(Path.join(base,  '/server/api/v1/stocks'));
var db = require(Path.join(base,  '/server/model/db'));

var server, request, stub;

lab.beforeEach(function(done){

  stub = {
    db: db
  };

  var ModelPlugin = Proxyquire(base + '/server/model/stock.model', {
    './db': stub.db
  });

  var plugins = [ProjectPlugin, ModelPlugin ];

  server = new Hapi.Server();
  server.connection({ port: config.get('/connections/port') });
  server.register(plugins, function (err) {
    if (err) { return done(err);}
    done();
  });

});

lab.experiment('GET /stock/{id}', function(){

  function createRequestGetStock(id){
    return {
      method: 'GET',
      url: '/stock/' + id
    };
  }

  lab.beforeEach(function(done) {

    var stockId = '0001';
    request = createRequestGetStock(stockId);
    stub.db = db;

    done();
  });

  lab.test('Should return successful response', function(done){
    server.inject(request, function(response) {
      Code.expect(response.result).to.deep.equal(
        {
          "id": "0001",
          "name": "Widget",
          "price": "2.54"
        });
      Code.expect(response.statusCode).to.equal(200);
      done();
    })
  });

  lab.test('Should return error response for shorter than 4 characters id', function(done){
    request = createRequestGetStock('023');
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(400);
      done();
    })
  });

  lab.test('Should return error response for not string id', function(done){
    request = createRequestGetStock([023]);
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(400);
      done();
    })
  });

  lab.test('Should return error response for empty string id', function(done){
    request = createRequestGetStock('""');
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(400);
      done();
    })
  });

  lab.test('Should return 404 for undefined id', function(done){
    request = createRequestGetStock('XXXX');
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(404);
      done();
    })
  });

});

lab.experiment('GET /stock', function() {

  lab.beforeEach(function(done) {
    request = {
      method: 'GET',
      url: '/stock'
    };
    stub.db = db;
    done();
  });

  lab.test('Should return successful response', function(done){
    server.inject(request, function(response) {
      Code.expect(response.result).to.be.an.array();
      Code.expect(stub.db.length).to.equal(2);
      Code.expect(response.result.length).to.equal(2);
      Code.expect(response.statusCode).to.equal(200);
      done();
    })
  });

});

lab.experiment('DELETE /stock/{id]', function() {

  function createDeleteRequest(id){
    return request = {
      method: 'DELETE',
      url: '/stock/' + id
    };
  }

  lab.beforeEach(function(done) {
    var stockId = '0002';
    request = createDeleteRequest(stockId);
    stub.db = db;
    done();
  });

  lab.test('Should return successful response', function(done) {
    var stockId = '0002';
    request = createDeleteRequest(stockId);
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(204);
      done();
    })
  });

  lab.test('Should return 404 for missing id', function(done) {
    var stockId = '0099';
    request = createDeleteRequest(stockId);
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(404);
      done();
    })
  });

  lab.test('Should return error for malformed id', function(done) {
    var stockId = 'XXX';
    request = createDeleteRequest(stockId);
    server.inject(request, function(response) {
      Code.expect(response.statusCode).to.equal(400);
      done();
    })
  });

});
