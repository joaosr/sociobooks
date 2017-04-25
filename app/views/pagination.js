var Marionette = require('backbone.marionette');

var PaginationView = Marionette.LayoutView.extend({
  template: require('../templates/pagination.html'),
});

module.exports = PaginationView;
