import { startGallery } from './gallery.js';
import { debounce } from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const defaultButtonElement = filtersElement.querySelector('#filter-default');
const randomButtonElement = filtersElement.querySelector('#filter-random');
const discussedButtonElement = filtersElement.querySelector('#filter-discussed');

const MAX_RANDOM_FILTER = 10;
const FilterList = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const getRandomIndex = function(min, max) {
  return Math.floor(Math.random() * (max - min));
};

const FilterHandlers = {
  [FilterList.DEFAULT]: function(data) {
    return data;
  },
  [FilterList.RANDOM]: function(data) {
    const randomIndexes = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexes.length < max) {
      const index = getRandomIndex(0, data.length - 1);
      if (!randomIndexes.includes(index)) {
        randomIndexes.push(index);
      }
    }
    return randomIndexes.map((index) => data[index]);
  },
  [FilterList.DISCUSSED]: function(data) {
    return [...data]
      .sort((item1, item2) => item2.comments.length - item1.comments.length);
  },
};

const repaint = function(evt, filter, data) {
  const filteredPhotos = FilterHandlers[filter](data);
  startGallery(filteredPhotos);
  const currentActiveElement = filtersFormElement.querySelector('.img-filters__button--active');
  currentActiveElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const startFilter = function(data) {
  const debouncedRepaint = debounce(repaint);
  filtersElement.classList.remove('img-filters--inactive');
  defaultButtonElement.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterList.DEFAULT, data);
  });
  randomButtonElement.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterList.RANDOM, data);
  });
  discussedButtonElement.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterList.DISCUSSED, data);
  });
};

export { startFilter };
