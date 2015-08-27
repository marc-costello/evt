'use strict';

var Cache = require('./../src/cache');
var _cache;

require('chai').should();

function mockHandler() {}
function mockHandler2() {}

describe('Cache', function() {
   beforeEach('new cache inst for each test', function() {
      _cache = new Cache();
   });

   it('should add a new entry to the cache', function() {
      _cache.add(123, 'click.mynamespace', mockHandler);
      _cache.getHandlers(123, 'click.mynamespace').should.have.length(1);
   });

   it('should return the a new event handler instance', function() {
      var handlerInstance = _cache.add(123, 'click.mynamespace', mockHandler);
      handlerInstance.elementToken.should.equal(123);
      handlerInstance.descriptor.should.equal('click.mynamespace');
      handlerInstance.handler.should.equal(mockHandler);
   });

   it('removeHandler should remove a specific handler from the cache', function() {
      var dummyEntry = _cache.add(123, 'click.mynamespace', mockHandler);
      _cache.removeHandler(dummyEntry);
      _cache.getHandlers(123, 'click.mynamespace').should.have.length(0);
   });

   it('removeAllHandlers should remove all handlers from the cache', function() {
      _cache.add(123, 'click.mynamespace', mockHandler);
      _cache.add(123, 'click.mynamespace', mockHandler2);
      _cache.removeAllHandlers(123, 'click.mynamespace');
      _cache.getHandlers(123, 'click.mynamespace').should.have.length(0);
   });
});
