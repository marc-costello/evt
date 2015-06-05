(function() {

   "use strict";

   /*
      EVT NEEDS:

      .on();
      .one();
      .off();
      .raise();

      - namespacing, e.g: evt(element).on("click.mynamespace", handler);
      - filtering, e.g: evt(document).on("click", "#my-element", handler);
      - raise/trigger, e.g: evt(document).raise("my-event", payload);

      - should we cache dom selectors? we should make sure the gc can still clean up.
   */

   function evt() {

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

      // handle the element/selector

      return new evt();
   }

   // or however we decide to export it.
   module.exports = evtInit;

})();
