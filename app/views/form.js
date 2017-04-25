var Marionette = require('backbone.marionette');

var FormView = Marionette.LayoutView.extend({
  tagName: 'form',
  template: require('../templates/form.html'),
  ui: {
    bookquery: '#id_bookquery',
  },
  triggers: {
    submit: 'input:book'
  },
  modelEvents: {
    change: 'render'
  }
});

module.exports = FormView;
