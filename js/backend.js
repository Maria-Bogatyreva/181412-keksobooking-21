'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;
const StatusCode = {
  OK: 200
};

const makeRequest = (onSuccess, onError, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  if (data) {
    xhr.open(`POST`, URL_SAVE);
    xhr.send(data);
  } else {
    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  }
};

//  Функция для ПОЛУЧЕНИЯ данных с сервера
const load = (onSuccess, onError) => {
  makeRequest(onSuccess, onError);
};

// Функция для ОТПРАВКИ данных на сервер
const save = (onSuccess, onError, data) => {
  makeRequest(onSuccess, onError, data);
};


window.backend = {
  load,
  save
};

