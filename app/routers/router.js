var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var BookList = require('../views/layout');
var BooksModel = require('../models/model');

var MESSAGE_SEARCH_BOOKS = "Search books.";

var Controller = Marionette.Object.extend({
  initialize: function() {
    var sociobooks = new BookList({
      model: new BooksModel({books: [], message: MESSAGE_SEARCH_BOOKS})
    });
    Backbone.history.start();
    sociobooks.render();
    sociobooks.triggerMethod('show');
    this.options.layout = sociobooks;
  },
  bookDetails: function(bookid) {
    var layout = this.getOption('layout');
    layout.triggerMethod('show:book:details', bookid);
    Backbone.history.navigate('book/' + bookid);
  },
  pagination: function(number) {
    var layout = this.getOption('layout');
    layout.triggerMethod('change:page', number);
    Backbone.history.navigate('page/' + number);
  }
})

var Router = Marionette.AppRouter.extend({
  appRoutes: {
    'book/:id': 'bookDetails',
    'page/:number': 'pagination'
  },
  controller: new Controller
});

module.exports = Router;
