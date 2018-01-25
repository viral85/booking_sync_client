import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Booking', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /bookings without data', function(assert) {
  visit('/bookings');

  andThen(function() {
    assert.equal(currentPath(), 'bookings.index');
    assert.equal(find('#blankslate').text().trim(), 'No Bookings found');
  });
});

test('visiting /bookings with data', function(assert) {
  server.create('booking');
  visit('/bookings');

  andThen(function() {
    assert.equal(currentPath(), 'bookings.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new booking', function(assert) {
  visit('/bookings');
  click('a:contains(New Booking)');

  andThen(function() {
    assert.equal(currentPath(), 'bookings.new');

    fillIn('label:contains(Start at) input', new Date());
    fillIn('label:contains(End at) input', new Date());
    fillIn('label:contains(Price) input', 'MyString');
    fillIn('label:contains(Client email) input', 'MyString');
    fillIn('label:contains(Rental) input', 42);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing booking', function(assert) {
  server.create('booking');
  visit('/bookings');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'bookings.edit');

    fillIn('label:contains(Start at) input', new Date());
    fillIn('label:contains(End at) input', new Date());
    fillIn('label:contains(Price) input', 'MyString');
    fillIn('label:contains(Client email) input', 'MyString');
    fillIn('label:contains(Rental) input', 42);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing booking', function(assert) {
  server.create('booking');
  visit('/bookings');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'bookings.show');

    assert.equal(find('p strong:contains(Start at:)').next().text(), new Date());
    assert.equal(find('p strong:contains(End at:)').next().text(), new Date());
    assert.equal(find('p strong:contains(Price:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Client email:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Rental:)').next().text(), 42);
  });
});

test('delete a booking', function(assert) {
  server.create('booking');
  visit('/bookings');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'bookings.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
