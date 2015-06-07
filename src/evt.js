var evtAttributeName = '__evt';
var tree = {};

function generateToken() {
  // todo
}

function evt(element) {

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
  if (!element || (element instanceof Element) === false) {
    throw new Error('You must supply a DOM element or selector to evt');
  }

  // first lets get on the same page. If it's not an Element already. querySelectorAll for it.
  var resolvedElement;
  if (!(element instanceof Element)) {
    resolvedElements = document.querySelectorAll(element);
  } else {
    resolvedElements[0] = element;
  }

  for (var i=0; i < resolvedElements.length; i++) {
    // now we need to check this element for an existing evt attribute
    var elementToken = resolvedElements[i].getAttribute(evtAttributeName);
    if (!elementToken) {
      // generate one and attach it to the element.
      elementToken = generateToken();
      resolvedElements[i].setAttribute(evtAttributeName, elementToken);
    }
  }
}

module.exports = evtInit;
