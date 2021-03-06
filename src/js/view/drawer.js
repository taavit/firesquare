define([
  'text!template/drawer.html',
  'text!template/spinner.html',
  'model/self'
], function (template, spinnerTemplate, self) {
  'use strict';

  var _isLoaded = false,
    _currentRemove,
    _drawer,
    _unloadView;

  function _initialize(remove) {
    if (!_isLoaded) {
      _isLoaded = true;
      $('body').html(_.template(template, self));
      $('body > section > header > a').on('click', _drawer);
    }

    _unloadView(remove);
  }

  _unloadView = function(remove) {
    if (_currentRemove !== undefined &&
        typeof _currentRemove === 'function') {
      _currentRemove();
    }
    _currentRemove = remove;
  };

  _drawer = function(hide) {

    var region = document.querySelector("body > section");

    if (region.getAttribute("data-state") === "drawer") {
      region.setAttribute("data-state", "none");
    } else if (hide !== true) {
      region.setAttribute("data-state", "drawer");
    }

    return false;
  };

  function _remove() {
    if (_isLoaded) {
      _isLoaded = false;
      $('body').html(_.template(spinnerTemplate));
    }
  }

  function _setTitle(title) {
    $('body[role="application"] section[role="region"] > header h1').html(title);
  }

  function _setContent(content) {
    $('div[role="main"]').html(content);
  }

  return Backbone.View.extend({
    initialize: _initialize,
    setTitle:   _setTitle,
    setContent: _setContent,
    remove:     _remove
  });
});