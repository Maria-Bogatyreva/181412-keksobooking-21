'use strict';
(function () {
  const URL = 'https://21.javascript.pages.academy/keksobooking/data';

  //  Функция для ПОЛУЧЕНИЯ данных с сервера
  const load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });


    xhr.send();
  };

  window.backend = {
    load: load
  }

})();
