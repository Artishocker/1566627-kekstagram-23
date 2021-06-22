//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNumber = function (minValue, MaxValue) {
  //источник MDN https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

  let min = minValue < MaxValue ? Math.ceil(minValue) : Math.ceil(MaxValue);
  const max = MaxValue > minValue ? Math.ceil(MaxValue) : Math.ceil(minValue);

  if (min<0 && max<0) {
    return false;
  }
  if (min<0) {
    min=0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

//getRandomNumber();

//Функция для проверки максимальной длины строки
// const checkCommentLength = function (currentLine, maxLength) {
//   return currentLine.length-1<= maxLength;
// };

// checkCommentLength(1,2);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomNumber, getRandomArrayElement};
