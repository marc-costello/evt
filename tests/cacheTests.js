'use strict';

var CacheConst = require('./../src/cache');
var cache;

require('chai').should();

function mockHandler() {}
function mockHandler2() {}

describe('Cache', function() {
   beforeEach('new cache inst for each test', function() {
      cache = new CacheConst();
   });

   it('should add a new entry to the cache', function() {
      cache.add(123, 'click.mynamespace', mockHandler);
      cache.cache.should.have.length(1);
   });

   it('should return the a new event handler instance', function() {
      var handlerInstance = cache.add(123, 'click.mynamespace', mockHandler);
      handlerInstance.elementToken.should.equal(123);
      handlerInstance.descriptor.should.equal('click.mynamespace');
      handlerInstance.handler.should.equal(mockHandler);
   });

   it('removeHandler should remove a specific handler from the cache', function() {
      var dummyEntry = cache.add(123, 'click.mynamespace', mockHandler);
      cache.removeHandler(dummyEntry);
      cache.cache.should.have.length(0);
   });

   it('removeAllHandlers should remove all handlers from the cache', function() {
      cache.add(123, 'click.mynamespace', mockHandler);
      cache.add(123, 'click.mynamespace', mockHandler2);
      cache.removeAllHandlers(123, 'click.mynamespace');
      console.log(cache.cache);
      cache.cache.should.have.length(0);
   });

   it('contains should return true if the cache contains the handler', function() {
      cache.add(123, 'click.mynamespace', mockHandler);
      cache.contains('click.mynamespace', mockHandler).should.equal(true);
   });

   it('contains should return false if the handler does not exist in the cache', function() {
      cache.contains('click.mynamespace', mockHandler).should.equal(false);
   });

   it('getHandler should return a singular matching entry', function() {
      cache.add(123, 'click.mynamespace', mockHandler);
      cache.getHandler(123, 'click.mynamespace', mockHandler).should.be.ok;
   });

   it('getHandlers should return an array of all matching handlers for the token/descriptor pair', function() {
      cache.add(123, 'click.mynamespace', mockHandler);
      cache.add(123, 'click.mynamespace', mockHandler2);
      cache.getHandlers(123, 'click.mynamespace').should.have.length(2);
   });
});
