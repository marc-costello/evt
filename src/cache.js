'use strict';

var _cache = [];

function EventHandler(token, descriptor, handler, proxyHandler, enabled) {
  var splitEventName = descriptor.split('.');
  this.elementToken = token;
  this.descriptor = descriptor;
  this.handler = handler;
  this.proxyHandler = proxyHandler;
  this.enabled = enabled;
  this.eventType = splitEventName[0];
  this.namespace = splitEventName[1];
}

module.exports = {
  add : function(token, descriptor, handler, proxyHandler) {
    var eventHandler = new EventHandler(token, descriptor, handler, proxyHandler, true);
    _cache.push(eventHandler);
    return eventHandler;
  },
  removeHandler : function(token, descriptor, handler) {
    var index = _cache.findIndex(function(entry) {
      return entry.elementToken === token && entry.descriptor === descriptor && entry.handler === handler;
    });
    _cache.splice(index, 1);
  },
  removeAllHandlers : function(token, descriptor) {
    _cache.forEach(function(entry, i, arr) {
      if (entry.elementToken === token && entry.descriptor === descriptor) {
        arr.splice(i, 1);
      }
    });
  },
  getHandlers : function(token, descriptor) {
    return _cache.filter(function(entry) {
      return entry.elementToken === token && entry.descriptor === descriptor;
    });
  },
  getHandler : function(token, descriptor, handler) {
    return _cache.filter(function(entry) {
      return entry.elementToken === token && entry.descriptor === descriptor && entry.handler === handler;
    })[0];
  },
  contains : function(descriptor, handler) {
    return _cache.some(function(entry) {
      return entry.descriptor === descriptor && entry.handler === handler;
    });
  }
};
