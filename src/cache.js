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
    _cache[token] = new EventHandler(token, eventName, handler, true);
  },
  removeHandler : function(token, handler) {
    delete _cache[token];
  },
  getHandlers : function(token, eventName) {
    return _cache
      .filter(function(entry) {
        return entry.elementToken === token && entry.eventName === eventName;
      })
      .map(function(h) {
        return h.handler;
      });
  }
};
