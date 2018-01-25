import Route from '@ember/routing/route';
import SaveModelMixin from 'booking-sync-client/mixins/rentals/save-model-mixin';

export default Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('rental');
  }
});
