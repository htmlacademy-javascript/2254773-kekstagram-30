import { createMessagesUIDsGenerator, getRandomArrayElement, getRandomInteger } from './util.js';

const DESCRIPTIONS = [
  'Я и горы',
  'Слияние двух рек',
  'Кораблики',
  'Красивый закат',
  'Моречко',
  'Волны',
  'Завтрак с видом на море',
  'Морские твари',
  'На раскопках',
  'Шашлыки на даче',
  'С друзьями',
  'Сон в летнюю ночь',
  'Прогулки под луной',
  'Кто кого',
  'Десткий сад',
  'Родственники',
  'На рыбалке',
  'Цветники',
  'Выходные в огороде',
  'Сбор вишни',
  'Последний день лета',
  'Дождались',
  'Снова школа',
  'Совместная готовка',
  'На закупах',
];

const NAMES = [
  'Виктория',
  'Анна',
  'Елена',
  'Александр',
  'Евгений',
  'Константин',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTOS_COUNT = 25;
const AVATAR_MIN_COUNT = 1;
const AVATAR_MAX_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;

function getMessage() {
  let message = '';
  const numMessage = Math.random() < 0.5 ? 1 : 2;
  for (let i = 0; i < numMessage; i++) {
    message += `${getRandomArrayElement(MESSAGES)} `;
  }
  return message.trim();
}

const getCommentUID = createMessagesUIDsGenerator();

function getComment() {
  const idx = getRandomInteger(AVATAR_MIN_COUNT, AVATAR_MAX_COUNT);
  return {
    id: getCommentUID(),
    avatar: `img/avatar-${idx}.svg`,
    message: getMessage(),
    name: NAMES[idx - 1],
  };
}

function createPhotoGenerator() {
  let id = 0;

  return (_id) => {
    if (!_id) {
      id += 1;
      _id = id;
    }

    return {
      _id,
      url: `photos/${_id}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
      comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, getComment)
    };
  };
}

const createPhoto = createPhotoGenerator();

export {createPhoto, PHOTOS_COUNT};
