const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

const MESSAGE_MAX_UID = 1000000;

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

export {createMessagesUIDsGenerator, getRandomArrayElement, getRandomInteger};
