// Функция для проверки длины строки:
window.validateTextLengh = (textString, maxLength) => textString.length <= maxLength;
// Функция для проверки, является ли строка палиндромом:
window.getPolydrome = (textString) => {
  const normalisedString = textString.toLowerCase().replaceAll(' ', '');
  let polydromeString = '';
  for (let i = normalisedString.length - 1; i >= 0; i--) {
    polydromeString += normalisedString.at(i);
  }
  return (polydromeString === normalisedString);
};
