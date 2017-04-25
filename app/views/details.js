var Marionette = require('backbone.marionette');

var DetailsView = Marionette.LayoutView.extend({
  tagName: 'div',
  template: require('../templates/details.html')
});

module.exports = DetailsView;
