'use strict';

var cache = require('./../src/cache'),
    should = require('chai').should();

function mockHandler() {}
function mockHandler2() {}

describe('Cache Add', function() {
   it('should add a new entry to the cache', function() {
      cache.add(123, 'click.mynamespace', mockHandler);
      cache.getHandlers(123, 'click.mynamespace').should.have.length(1);
   });

   it('should return the a new event handler instance', function() {
      var handlerInstance = cache.add(123, 'click.mynamespace', mockHandler);
      handlerInstance.elementToken.should.equal(123);
      handlerInstance.descriptor.should.equal('click.mynamespace');
      handlerInstance.handler.should.equal(mockHandler);
   });
});

describe('Cache Remove', function() {
   it('removeHandler should remove a specific handler from the cache', function() {
      var dummyEntry = cache.add(123, 'click.mynamespace', mockHandler);
      cache.removeHandler(dummyEntry);
      cache.getHandlers(123, 'click.mynamespace').should.have.length(0);
   });

   it('removeAllHandlers should remove all handlers from the cache', function() {
      cache.add(123, 'click.mynamespace', mockHandler);
      cache.add(123, 'click.mynamespace', mockHandler2);
      cache.removeAllHandlers(123, 'click.mynamespace');
      cache.getHandlers(123, 'click.mynamespace').should.have.length(0);
   });
});
