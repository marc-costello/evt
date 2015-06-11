'use strict';

var cache = require('cache');
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

  cache.add(token, descriptor, splitDescriptor, handler);

  if (!cache.contains(descriptor, handler)) {
    element.addEventListener(splitDescriptor[0], createProxyHandler(token));
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
    on(this._elements, descriptor, handler);
  }
};

evt.prototype.one = function() {
  // todo
};

evt.prototype.off = function() {
  // todo
};

evt.prototype.raise = function() {
  // todo
};

function evtInit(element) {
  if (!element || ((element instanceof Element) || typeof element === 'string')) {
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

module.exports = evtInit;
