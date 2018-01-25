import DS from 'ember-data';

export default DS.Model.extend({
  startAt: DS.attr('date'),
  endAt: DS.attr('date'),
  price: DS.attr('number'),
  clientEmail: DS.attr('string'),
  rental_daily_rate: DS.attr('number'),
  rental: DS.belongsTo('rental',      {async: true}),
  duration: Ember.computed('startAt', 'endAt', function() {
    var self = this;
    var date1 = new Date(self.get('startAt'));
    var date2 = new Date(self.get('endAt'));
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }),
  new_price: Ember.computed('rental_daily_rate', 'duration', function() {
    var self = this;
    var rate = new Date(self.get('rental_daily_rate'));
    var days = new Date(self.get('duration'));
    return rate * days;;
  })
});
