An event library for the DOM

Kinda like jQuery events, without the jQuery part.

[![Join the chat at https://gitter.im/marc-costello/evt](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/marc-costello/evt?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Usage

### Creating an evt object.

````
evt(DOMElement);
evt(DOMCollection);
evt("#element-id");
````

### evt Methods

.on();
.one();
.off();
.raise();

namespacing, e.g: evt(element).on("click.mynamespace", handler);
filtering, e.g: evt(document).on("click", "#my-element", handler);
raise/trigger, e.g: evt(document).raise("my-event", payload);
