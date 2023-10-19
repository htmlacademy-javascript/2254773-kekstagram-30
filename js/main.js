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
      idx = getRandomInteger(0, 100000000);
      ifUID = !generatedUIDs.some((uid) => uid === idx);
    }
    generatedUIDs.push(idx);
    return idx;
  };
}

const getCommentUID = createMessagesUIDsGenerator();

function getComment() {
  const idx = getRandomInteger(1, 6);
  return {
    id: getCommentUID(),
    avatar: `img/avatar-${idx}.svg`,
    message: getMessage(),
    name: NAMES[idx - 1],
  };
}

let id = 0;

function createPhoto() {
  id += 1;
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, getComment)
  };
}

Array.from({ length: PHOTOS_COUNT }, createPhoto);
