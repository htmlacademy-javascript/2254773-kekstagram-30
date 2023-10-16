// Функция для проверки длины строки:
const validateTextLengh = (textString, maxLength) => textString.length <= maxLength;

validateTextLengh('проверяемая строка', 30);
validateTextLengh('проверяемая строка', 18);
validateTextLengh('проверяемая строка', 10);
// Функция для проверки, является ли строка палиндромом:
const getPolydrome = (textString) => {
  const normalisedString = textString.toLowerCase().replaceAll(' ', '');
  let polydromeString = '';
  for (let i = normalisedString.length - 1; i >= 0; i--) {
    polydromeString += normalisedString.at(i);
  }
  return (polydromeString === normalisedString);
};

getPolydrome('топот');
getPolydrome('ДовОд');
getPolydrome('Кекс');
getPolydrome('Лёша на полке клопа нашёл');
