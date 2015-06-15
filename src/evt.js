'use strict';

var cache = require('./cache');
var evtAttributeName = '__evt';
var idCount = 1;

function generateToken() {
  // todo - make this better.
  return idCount++;
}

function createProxyHandler(token) {
  return function(event) {
    var handlers = cache.getHandlers(token, event.type);
    handlers.forEach(function(h) {
      h(event);
    });
  };
}

function on(element, descriptor, handler) {
  var token = element.getAttribute(evtAttributeName);

  if (!cache.contains(descriptor, handler)) {
    var proxyHandler = createProxyHandler(token);
    var cachedEvent = cache.add(token, descriptor, handler, proxyHandler);
    element.addEventListener(cachedEvent.eventType, proxyHandler);
  }
}

function off(element, descriptor, handler) {
  var token = element.getAttribute(evtAttributeName);

  var cachedHandler = cache.getHandler(token, descriptor, handler);
  if (cachedHandler) {
    element.removeEventListener(cachedHandler.eventType, cachedHandler.proxyHandler);
    cache.removeHandler(token, descriptor, handler);
  }
}

function offAll(element, descriptor) {
  var token = element.getAttribute(evtAttributeName);

  var cachedHandlers = cache.getHandlers(token, descriptor);
  for (var i=0; i < cachedHandlers.length; i++) {
    element.removeEventListener(cachedHandlers[i].eventType, cachedHandlers[i].handler);
  }
  cache.removeAllHandlers(token, descriptor);
}

function evt(elements) {
  this._elements = elements;
}

evt.prototype.on = function(descriptor, handler) {
  if (!descriptor) {
    throw new Error('An event type is required');
  }
  if (!handler) {
    throw new Error('A handler is required');
  }

  for (var i=0; i < this._elements.length; i++) {
    on(this._elements[i], descriptor, handler);
  }

  return this;
};

evt.prototype.one = function() {
  // todo
};

evt.prototype.off = function(descriptor, handler) {
  if (!descriptor) {
    throw new Error('An event descriptor is required');
  }

  if (!handler) {
    for (var i=0; i < this._elements.length; i++) {
      offAll(this._elements[i], descriptor);
    }
  } else {
    for (var y=0; y < this._elements.length; y++) {
      off(this._elements[y], descriptor, handler);
    }
  }

  return this;
};

evt.prototype.raise = function() {
  // todo
};

function evtInit(element) {
  if (!element || !((element instanceof Element) || typeof element === 'string')) {
    throw new Error('You must supply a DOM element or selector to evt');
  }

  var resolvedElements;
  if (!(element instanceof Element)) {
    resolvedElements = document.querySelectorAll(element);
  } else {
    resolvedElements[0] = element;
  }

  for (var i=0; i < resolvedElements.length; i++) {
    var elementToken = resolvedElements[i].getAttribute(evtAttributeName);
    if (!elementToken) {
      elementToken = generateToken();
      resolvedElements[i].setAttribute(evtAttributeName, elementToken);
    }
  }

  return new evt(resolvedElements);
}

window.evt = evtInit;
