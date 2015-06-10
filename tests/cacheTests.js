'use strict';

var cache = require('./../src/cache');
require('chai').should();

function mockHandler() {}

describe('Cache Add', function() {
   it('should add a new entry to the cache', function() {
      function callAdd() {
         cache.add(123, 'click.mynamespace', mockHandler);
      }
      callAdd.should.not.throw(Error);
   });
});
