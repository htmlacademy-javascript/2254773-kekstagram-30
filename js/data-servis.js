const URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные',
  [Method.POST]: 'Ошибка загрузки файла',
};

const fetchData = async function(url, method = Method.GET, body = null) {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const getPhotosData = async function() {
  return fetchData(URL + Route.GET_DATA);
};

const sendNewPhoto = async function(formData) {
  return fetchData(URL + Route.SEND_DATA, Method.POST, formData);
};

export { getPhotosData, sendNewPhoto };
