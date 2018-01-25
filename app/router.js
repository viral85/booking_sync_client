import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('rentals', function() {
    this.route('new');

    this.route('edit', {
      path: ':rental_id/edit'
    });

    this.route('show', {
      path: ':rental_id'
    });
  });
  this.route('bookings', function() {
    this.route('new');

    this.route('edit', {
      path: ':booking_id/edit'
    });

    this.route('show', {
      path: ':booking_id'
    });
  });
});

export default Router;
