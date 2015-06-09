var _cache = [];

function EventHandler(token, eventName, handler, enabled) {
  this.elementToken = token;
  this.eventName = 'click.namespacename';
  this.eventType = 'click';
  this.namespace = 'namespace';
  this.handler = handler;
  this.enabled = enabled;
}

module.exports = {
  add : function(token, eventName, handler) {
    _cache.push(new EventHandler(token, eventName, handler, true));
  },
  removeHandler : function(token, handler) {
    var index = _cache.findIndex(function(entry) {
      return entry.elementToken === token && entry.handler === handler;
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
