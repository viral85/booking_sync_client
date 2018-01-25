import { Factory } from 'ember-cli-mirage';

export default Factory.extend(
  {startAt: new Date(), endAt: new Date(), price: 'MyString', clientEmail: 'MyString', rental_id: 42, rental_name: 'oyo' }
);
