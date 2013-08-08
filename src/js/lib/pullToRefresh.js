define([], function () {
  'use strict';

  /**
  Event handler registration function.

  @method _registerPullToRefreshEvent
  @namespace Lib
  @param element {HTMLElement} Element to attach event handler.
  @private
  @for pullToRefresh
  */
  function _registerPullToRefreshEvent(element) {

    /**
    Event handler for track event. This function control track direction, and if x-asis gesture is detected, cancels it.

    @method _track
    @param event {Object} Track event object.
    @private
    @for pullToRefresh
    */
    function _track(event) {
      if (event.yDirection !== 1 || Math.abs(event.ddx) > Math.abs(event.ddy)) {
        event.cancel();
      }
    }

    /**
    Event handler for trackend event. If Pull gesture was detected `pull` event id dispatched.

    @method _end
    @param event {Object} Track event object.
    @private
    @for pullToRefresh
    */
    function _end(event) {
      event.preventTap();
      var pulled = new window.CustomEvent('pull');
      if (event.dy > 30 && Math.abs(event.dx) < event.dy) {
        element.dispatchEvent(pulled);
      }
    }
    element.addEventListener('trackend', _end);
    element.addEventListener('track', _track);
  }

  return {
    /**
    Method points to {{#crossLink "Lib.pullToRefresh/_registerPullToRefreshEvent"}}{{/crossLink}}

    @method registerPullToRefreshEvent
    @for pullToRefresh
    */
    'registerPullToRefreshEvent' : _registerPullToRefreshEvent
  };
});
