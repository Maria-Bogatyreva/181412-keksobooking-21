'use strict';

(function () {
  // Функция для получения случайного числа в указанном диапазоне
  const getRandomNumber = function (min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  // Функция для получения случайного элемента массива
  const getRandomElement = function (elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  // Функция для получения массива случайной длины
  const getRandomArray = function (primaryElements) {
    // Клонируем исходный массив
    const copyElements = primaryElements.slice();
    // Перетасовываем клон-массив
    let j;
    let temp;
    for (let i = copyElements.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = copyElements[i];
      copyElements[i] = copyElements[j];
      copyElements[j] = temp;
    }
    //  Отрезаем кусок случайной длины
    return copyElements.slice(getRandomNumber(0, copyElements.length));
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray
  };
})();
