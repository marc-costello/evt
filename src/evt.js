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

   function ext() {

   }

   ext.prototype.on = function() {
      // todo
   };

   ext.prototype.one = function() {
      // todo
   };

   ext.prototype.off = function() {
      // todo
   };

   ext.prototype.raise = function() {
      // todo
   };

   function extInit(element) {

      // handle the element/selector

      return new ext();
   }

   // or however we decide to export it.
   module.exports = extInit;

})();
