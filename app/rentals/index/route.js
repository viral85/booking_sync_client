// import Ember from 'ember';
import Route from '@ember/routing/route'
export default Route.extend({
  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    }
  },
  model: function() {
    return this.store.findAll('rental');
  }
});
