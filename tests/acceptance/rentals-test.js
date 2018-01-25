// import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { run } from '@ember/runloop';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Rental', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /rentals without data', function(assert) {
  visit('/rentals');

  andThen(function() {
    assert.equal(currentPath(), 'rentals.index');
    assert.equal(find('#blankslate').text().trim(), 'No Rentals found');
  });
});

test('visiting /rentals with data', function(assert) {
  server.create('rental');
  visit('/rentals');

  andThen(function() {
    assert.equal(currentPath(), 'rentals.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new rental', function(assert) {
  visit('/rentals');
  click('a:contains(New Rental)');

  andThen(function() {
    assert.equal(currentPath(), 'rentals.new');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing rental', function(assert) {
  server.create('rental');
  visit('/rentals');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'rentals.edit');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing rental', function(assert) {
  server.create('rental');
  visit('/rentals');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'rentals.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
  });
});

test('delete a rental', function(assert) {
  server.create('rental');
  visit('/rentals');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'rentals.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
