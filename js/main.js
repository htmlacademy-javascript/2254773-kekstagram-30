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
const MESSAGE_MAX_UID = 1000000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

function getMessage() {
  let message = '';
  const numMessage = Math.random() < 0.5 ? 1 : 2;
  for (let i = 0; i < numMessage; i++) {
    message += `${getRandomArrayElement(MESSAGES)} `;
  }
  return message.trim();
}

function createMessagesUIDsGenerator() {
  const generatedUIDs = [];

  return () => {
    let idx;
    let ifUID = false;
    while (!ifUID) {
      idx = getRandomInteger(0, MESSAGE_MAX_UID);
      ifUID = !generatedUIDs.some((uid) => uid === idx);
    }
    generatedUIDs.push(idx);
    return idx;
  };
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

Array.from({ length: PHOTOS_COUNT }, createPhoto);
