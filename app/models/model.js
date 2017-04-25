var Backbone = require('backbone');

var MESSAGE_BOOKS_NOT_FOUND = "No book found, please try again.";
var MESSAGE_RESULTS = "10 of ### results.";

var BooksModel = Backbone.Model.extend({
    url: "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes",
    parse: function(result){
      var books = [];
      var message = MESSAGE_BOOKS_NOT_FOUND;

      for(var item  in result.items){
        books.push(
          {
            id: result.items[item].id,
            title: result.items[item].volumeInfo.title,
            subtitle: result.items[item].volumeInfo.subtitle,
            authors: result.items[item].volumeInfo.authors,
            date_publication: result.items[item].volumeInfo.publishedDate,
          }
        );
      }

      if(result.totalItems > 0){
        message = MESSAGE_RESULTS.replace("###", result.totalItems);
      }

      numberPages = Math.ceil(result.totalItems/10);

      var pages = [];

      for(var i=0;i<numberPages;i++){
        pages.push(i);
      }

      return {books:books, message: message, pages: pages};
    }
});

module.exports = BooksModel;
