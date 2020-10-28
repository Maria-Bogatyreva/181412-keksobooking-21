'use strict';

const DEBOUNCE_INTERVAL = 500; // ms

const debounce = function (cb) {
  var lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};


window.debounce = debounce;

