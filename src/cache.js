'use strict';

function EventHandler(token, descriptor, handler, proxyHandler, once, enabled) {
  var splitEventName = descriptor.split('.');
  this.elementToken = token;
  this.descriptor = descriptor;
  this.handler = handler;
  this.proxyHandler = proxyHandler;
  this.enabled = enabled;
  this.eventType = splitEventName[0];
  this.namespace = splitEventName[1];
}

module.exports = function() {

  var _cache = [];

  Object.defineProperty(this, 'cache', { get: function() { return _cache; } });

  this.add = function(token, descriptor, handler, proxyHandler, once) {
    var eventHandler = new EventHandler(token, descriptor, handler, proxyHandler, once, true);
    _cache.push(eventHandler);
    return eventHandler;
  };

  this.removeHandler = function(entry) {
    var index = _cache.indexOf(entry);
    if (index !== -1) {
      _cache.splice(index, 1);
    }
  };

  this.removeAllHandlers = function(token, descriptor) {
    for (var i = _cache.length -1; i >= 0 ; i--){
       if (_cache[i].elementToken === token && _cache[i].descriptor === descriptor){
           _cache.splice(i, 1);
       }
    }
  };

  this.getHandlers = function(token, descriptor) {
    return _cache.filter(function(entry) {
      return entry.elementToken === token && entry.descriptor === descriptor;
    });
  };

  this.getHandler = function(token, descriptor, handler) {
    return _cache.filter(function(entry) {
      return entry.elementToken === token && entry.descriptor === descriptor && entry.handler === handler;
    })[0];
  };

  this.contains = function(descriptor, handler) {
    return _cache.some(function(entry) {
      return entry.descriptor === descriptor && entry.handler === handler;
    });
  };
};
