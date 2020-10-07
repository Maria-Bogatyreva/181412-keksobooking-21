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

  window.util = {
      getRandomNumber: getRandomNumber,
      getRandomElement: getRandomElement,
      sayHello: sayHello
    };
})();


/*
// Функция для получения случайного числа в указанном диапазоне
const getRandomNumber = function (min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
*/
