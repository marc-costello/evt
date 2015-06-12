'use strict';

var _cache = [];

function EventHandler(token, eventName, handler, enabled) {
  var splitEventName = eventName.split('.');
  this.elementToken = token;
  this.eventName = eventName;
  this.handler = handler;
  this.enabled = enabled;
  this.eventType = splitEventName[0];
  this.namespace = splitEventName[1];
}

module.exports = {
  add : function(token, eventName, splitEventName, handler) {
    var eventHandler = new EventHandler(token, eventName, handler, true);
    _cache.push(eventHandler);
    return eventHandler;
  },
  removeHandler : function(token, eventName, handler) {
    var index = _cache.findIndex(function(entry) {
      return entry.elementToken === token && entry.eventName === eventName && entry.handler === handler;
    });
    _cache.splice(index, 1);
  },
  getHandlers : function(token, eventName) {
    return _cache.reduce(function(acc, entry) {
      if (entry.elementToken === token && entry.eventName === eventName) {
        acc.push(entry.handler);
      }
    }, []);
  },
  contains : function(eventName, handler) {
    return _cache.some(function(entry) {
      return entry.eventName === eventName && entry.handler === handler;
    });
  }
};
