define([], function () {
  'use strict';
  function _registerPullToRefreshEvent(element) {
    var sx, sy, ex, ey, dx, dy;

    function _start(event) {
      sx = event.touches[0].clientX;
      sy = event.touches[0].clientY;
    }

    function _end(event) {
      var direction = '',
        pulled = null;
      ex = event.touches[0].clientX;
      ey = event.touches[0].clientY;
      dx = ex - sx;
      dy = ey - sy;
        //Detect if swipe appear
      if (Math.abs(dx) > 20 || Math.abs(dy) > 20) {
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) {
            direction = 'right';
          } else {
            direction = 'left';
          }
        } else {
          if (dy > 0) {
            direction = 'down';
          } else {
            direction = 'up';
          }
        }
        pulled = new window.CustomEvent('pull', {'detail': {'direction': direction}});
        element.dispatchEvent(pulled);
      }
    }
    element.addEventListener('touchstart', _start);
    element.addEventListener('touchend', _end);
    element.dataset.swipeRegistered = true;
  }
  return {
    'registerPullToRefreshEvent' : _registerPullToRefreshEvent
  };
});
