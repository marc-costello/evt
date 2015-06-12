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

function splitEventDescriptor(descriptor) {
  return descriptor.split('.');
}

function on(element, descriptor, handler) {
  var token = element.getAttribute(evtAttributeName);
  var splitDescriptor = splitEventDescriptor(descriptor);

  if (!cache.contains(descriptor, handler)) {
    var cachedEvent = cache.add(token, descriptor, splitDescriptor, handler);
    element.addEventListener(cachedEvent.eventType, createProxyHandler(token));
  }
}

function off(element, descriptor, handler) {
  var token = element.getAttribute(evtAttributeName);
  var splitDescriptor = splitEventDescriptor(descriptor);

  if (cache.contains(descriptor, handler)) {
    element.removeEventListener(splitDescriptor[0], handler);
    cache.removeHandler(token, descriptor, handler);
  }
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

  // todo - if handler is undefined - remove all handlers for that descriptor

  for (var i=0; i < this._elements.length; i++) {
    off(this._elements[i], descriptor, handler);
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
