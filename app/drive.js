var Marionette = require('backbone.marionette');

var Router = require('./routers/router');


var app = new Marionette.Application({
  onStart: function(options) {
    var router = new Router(options);
  }
});

app.start();
