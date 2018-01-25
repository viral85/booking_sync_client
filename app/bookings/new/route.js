import Ember from 'ember';
import SaveModelMixin from 'booking-sync-client/mixins/bookings/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  actions: {
    rentalChange: function() {
      alert('n');
    }
  },
  model: function() {
    return this.store.createRecord('booking');
  },
  setupController(controller, model) {
    controller.set('model', model);
    this.store.findAll('rental').then(function(rentals) {
      controller.set('rentals', rentals);
    });
  }

});
