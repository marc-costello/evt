'use strict';

var _cache = [];

function EventHandler(token, eventName, handler, enabled) {
  var eventNameSplit = eventName.split('.');
  this.elementToken = token;
  this.eventName = eventName;
  this.handler = handler;
  this.enabled = enabled;
  this.eventType = eventNameSplit[0];
  this.namespace = eventNameSplit[1];
}

module.exports = {
  add : function(token, eventName, handler) {
    _cache.push(new EventHandler(token, eventName, handler, true));
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
  }
};
