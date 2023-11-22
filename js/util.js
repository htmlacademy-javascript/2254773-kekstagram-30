const errorLoadPhotoElement = document.querySelector('#data-error').content.querySelector('.data-error');
const bodyElement = document.querySelector('body');

const REMOVE_MESSAGE_TIMEOUT = 5000;

const showErrorMessage = () => {
  const errorTextElement = errorLoadPhotoElement.cloneNode(true);
  bodyElement.append(errorTextElement);

  setTimeout(() => {
    errorTextElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const cleanUpChildren = (htmlElement) => {
  Array.from(htmlElement.children).forEach((element) => {
    htmlElement.removeChild(element);
  });
};

export { isEscapeKey, cleanUpChildren, showErrorMessage };
