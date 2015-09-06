'use strict';

var CacheConstructor = require('./cache');
var cache = new CacheConstructor();
var evtAttributeName = '__evt';
var idCount = 1;

function generateToken() {
  // todo - make this better.
  return idCount++;
}

function createProxyHandler(element, token) {
  return function(event) {
    var handlers = cache.getHandlers(token, event.type);
    handlers.forEach(function(entry) {
      entry.handler.call(element, event);
    });
  };
}

function createOnceProxyHandler(element, token) {
   return function(event) {
     var handlers = cache.getHandlers(token, event.type);
     handlers.forEach(function(entry) {
       entry.handler.call(element, event);
       element.removeEventListener(entry.descriptor, entry.proxyHandler);
       cache.removeHandler(entry);
     });
   };
}

function on(element, descriptor, handler) {
  var token = element.getAttribute(evtAttributeName);

  if (!cache.contains(descriptor, handler)) {
    var proxyHandler = createProxyHandler(element, token);
    var cachedEvent = cache.add(token, descriptor, handler, proxyHandler, false);
    element.addEventListener(cachedEvent.eventType, proxyHandler);
  }
}

function one(element, descriptor, handler) {
   var token = element.getAttribute(evtAttributeName);

   if (!cache.contains(descriptor, handler)) {
     var proxyHandler = createOnceProxyHandler(element, token);
     var cachedEvent = cache.add(token, descriptor, handler, proxyHandler, true);
     element.addEventListener(cachedEvent.eventType, proxyHandler);
   }
}

function off(element, descriptor, handler) {
  var token = element.getAttribute(evtAttributeName);

  var cachedHandler = cache.getHandler(token, descriptor, handler);
  if (cachedHandler) {
    element.removeEventListener(cachedHandler.eventType, cachedHandler.proxyHandler);
    cache.removeHandler(cachedHandler);
  }
}

function offAll(element, descriptor) {
  var token = element.getAttribute(evtAttributeName);

  var cachedHandlers = cache.getHandlers(token, descriptor);
  for (var i=0; i < cachedHandlers.length; i++) {
    element.removeEventListener(cachedHandlers[i].eventType, cachedHandlers[i].proxyHandler);
  }
  cache.removeAllHandlers(token, descriptor);
}

function raise(element, descriptor, eventMsg) {
   // todo: what if we need to trigger a build in event on the element
   // such as click for example.

   // Create the event.
   var eventInst = document.createEvent('Event');
   eventInst.data = eventMsg;
   // Define that the event name is 'build'.
   eventInst.initEvent(descriptor, true, true);

   // target can be any Element or other EventTarget.
   element.dispatchEvent(eventInst);
}

function evt(elements) {
  this._elements = elements;
}

evt.prototype.on = function(descriptor, handler) {
  if (!descriptor) {
    throw new Error('An event descriptor is required');
  }
  if (!handler) {
    throw new Error('A handler is required');
  }

  for (var i=0; i < this._elements.length; i++) {
    on(this._elements[i], descriptor, handler);
  }

  return this;
};

evt.prototype.one = function(descriptor, handler) {
  // same as on, except removeHandler after call. We can do this in the proxy?
  if (!descriptor) {
    throw new Error('An event descriptor is required');
  }
  if (!handler) {
    throw new Error('A handler is required');
  }

  for (var i=0; i < this._elements.length; i++) {
    one(this._elements[i], descriptor, handler);
  }

  return this;
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

evt.prototype.raise = function(descriptor, eventMsg) {
   if (!descriptor) {
     throw new Error('An event descriptor is required');
   }

   // todo: if we aren't passing any message (custom event), we can just trigger the handlers for the descriptor
   //       else we are going to need to build a custom event and pass that to the handlers.
   //       question is - do we create our own evt object?

   for (var i=0; i < this._elements.length; i++) {
      raise(this._elements[i], descriptor, eventMsg);
   }
};

function evtInit(element) {
  if (!element || !((element instanceof Element) || typeof element === 'string')) {
    throw new Error('You must supply a DOM element or selector to evt');
  }

  var resolvedElements = [];
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
