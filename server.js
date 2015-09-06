var Glue = require('glue');
var manifest = require('./manifest.js');
var config = require('./config.js');

var options = {
  relativeTo: __dirname
};

Glue.compose(manifest, options, function (err, server) {

  if (err) {
    throw err;
  }

  server.start(function () {
    server.log(['success', 'server'], 'Started server on http://localhost:' +  config.get('/connections/port') );
  });

});