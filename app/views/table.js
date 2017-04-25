var Marionette = require('backbone.marionette');

var TableView = Marionette.LayoutView.extend({
  tagName: 'table',
  template: require('../templates/table.html'),
  ui: {
    title: '#title',
    subtitle: '#subtitle',
    authors: '#authors',
    date: '#date'
  },
  triggers: {
    'click @ui.title': 'sort:books:by:title',
    'click @ui.subtitle': 'sort:books:by:subtitle',
    'click @ui.authors': 'sort:books:by:authors',
    'click @ui.date': 'sort:books:by:date'
  },
  modelEvents: {
    change: 'render'
  }
});

module.exports = TableView;
