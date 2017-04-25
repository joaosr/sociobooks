var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var FormView = require('./form');
var MessageView = require('./message');
var TableView = require('./table');
var DetailsView = require('./details');
var PaginationView = require('./pagination');

var MESSAGE_ERROR_SEARCH_BOOKS = "Search error, please try again.";

var ModelDetails = require('../models/book');

var Layout = Marionette.LayoutView.extend({
  el: '#app-hook',
  template: require('../templates/layout.html'),
  regions: {
    form: '.form',
    message: '.message',
    list: '.list',
    details: '.details',
    loader: '.loader',
    pages: '.pages'
  },
  onShow: function() {
    this.currentPage = this.currentPage || 0;
    this.model.attributes.query = this.model.attributes.query || '';

    var formView = new FormView({model: this.model});
    this.showChildView('form', formView);

    var messageView = new MessageView({model: this.model});
    this.showChildView('message', messageView);

    if(this.model.attributes.books.length > 0){
        var tableView = new TableView({model: this.model});
        var paginationView = new PaginationView({model: this.model});

        this.showChildView('list', tableView);
        this.showChildView('pages', paginationView);
    }else{
        this.$el.find('.list').html('');
        this.$el.find('.pages').html('');
        Backbone.history.navigate('/');
    }
    this.$el.find('.details').html('');
  },
  onShowLoader: function(){
    this.$el.find('.loader').addClass('loading');
  },
  onHideLoader: function(){
    this.$el.find('.loader').removeClass('loading');
  },
  onShowBookDetails: function(bookid){
    var self = this;
    this.$el.find('.list').html('');
    this.$el.find('.pages').html('');
    this.$el.find('.message').html('');
    var modelDetails = new ModelDetails({currentPage: this.currentPage});
    var detailsView = new DetailsView({model: modelDetails});
    modelDetails.url = 'https://www.googleapis.com/books/v1/volumes/'+bookid;
    modelDetails.fetch({
      success: function(){
        self.showChildView('details', detailsView);
      }
    });

  },
  onChildviewSortBooksByTitle: function(child){
    this.sortBooks("title");
  },
  onChildviewSortBooksBySubtitle: function(child){
    this.sortBooks("subtitle");
  },
  onChildviewSortBooksByAuthors: function(child){
    this.sortBooks("authors");
  },
  onChildviewSortBooksByDate: function(child){
    this.sortBooks("date_publication");
  },
  sortBooks: function(key){
    var sort;
    this.sortBooksAsc = this.sortBooksAsc || false;

    if(this.sortBooksAsc){
      sort = function (a, b) {
        if(a[key] == undefined) {
          return 1;
        }
        return a[key].localeCompare(b[key]);
      }
      this.sortBooksAsc = false;
    }else{
      sort = function (a, b) {
        if(b[key] == undefined) {
          return 1;
        }
        return b[key].localeCompare(a[key]);
      };
      this.sortBooksAsc = true;
    }

    this.model.attributes.books.sort(sort);
    this.triggerMethod('show');
  },
  onChangePage: function(number){
    if(this.currentPage == number){
      this.triggerMethod('show');
    }else{
      this.currentPage = number;
      this.requestBooks(this.model.attributes.query, number*10, 10);
    }

  },
  onChildviewInputBook: function(child){
    if(child.ui.bookquery.val())
      this.requestBooks(child.ui.bookquery.val(), 0, 10);
  },
  requestBooks: function(query, startIndex, maxResults){
    var self = this;
    this.model.attributes.query = query;
    this.model.url = "https://www.googleapis.com/books/v1/volumes?q="+query+"&startIndex="+startIndex+"&maxResults="+maxResults+"&printType=books";
    this.triggerMethod('showLoader');
    this.model.fetch({success: function(){
        self.triggerMethod('show');
        self.triggerMethod('hideLoader');
    }, error: function(){
        self.model.attributes.message = MESSAGE_ERROR_SEARCH_BOOKS;
        self.model.attributes.books = [];
        self.triggerMethod('show');
        self.triggerMethod('hideLoader');
    }});
  },
});

module.exports = Layout;
