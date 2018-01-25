// import Ember from 'ember';
import Route from '@ember/routing/route'
export default Route.extend({
  actions: {
    add_booking: function(model) {
      var route = this;
      model.save().then(function() {
        route.transitionTo('rentals');
      }, function() {
        console.log('Failed to save the model');
      });
    }
  },
  remove: function(model) {
    if(confirm('Are you sure?')) {
      model.destroyRecord();
    }
  },
  setupController(controller, model) {
    controller.set('model', model);
    var booking = this.store.createRecord('booking',{
      rental: model
    });
    controller.set('booking', booking);
  }
});
