'use strict';

const DEBOUNCE_INTERVAL = 500; // ms

const debounce = (cb) => {
  var lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};


window.debounce = debounce;

