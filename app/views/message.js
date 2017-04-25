var Marionette = require('backbone.marionette');

var MassageView = Marionette.LayoutView.extend({
  template: require('../templates/message.html'),
});

module.exports = MassageView;
