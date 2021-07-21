//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNumber = function (minValue, MaxValue) {
  //источник MDN https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

  let min = minValue < MaxValue ? Math.ceil(minValue) : Math.ceil(MaxValue);
  const max = MaxValue > minValue ? Math.ceil(MaxValue) : Math.ceil(minValue);

  if (min < 0 && max < 0) {
    return false;
  }
  if (min < 0) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const getRandomSet = (minValue, maxValue, amount) => {
  const newSet = new Set();
  while (newSet.size < amount) {
    newSet.add(getRandomNumber(minValue, maxValue));
  }
  return newSet;
};

const getRandomSetFromArr = (inputArr, outputArrLength) => {
  const outputArr = [];
  const randomSet = getRandomSet(0, inputArr.length - 1, outputArrLength);
  randomSet.forEach( (item) => {
    outputArr.push(inputArr[item]);
  });
  return outputArr;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomNumber, isEscEvent, getRandomSetFromArr};
