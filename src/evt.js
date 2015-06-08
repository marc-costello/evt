var evtAttributeName = '__evt';
var idCount = 0;
var tree = {};

function generateToken() {
  // todo - make this better.
  return idCount++;
}

function evt(elements) {
  this._elements = elements;
}

evt.prototype.on = function() {
  // todo
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
  if (!element || (element instanceof Element) === false || typeof element !== 'string') {
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
