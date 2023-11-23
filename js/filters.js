import { startGallery } from './gallery.js';
import { debounce } from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filtersElement.querySelector('#filter-default');
const randomButton = filtersElement.querySelector('#filter-random');
const discussedButton = filtersElement.querySelector('#filter-discussed');

const MAX_RANDOM_FILTER = 10;

const filterList = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [filterList.DEFAULT]: (data) => data,
  [filterList.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length - 1);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [filterList.DISCUSSED]: (data) => [...data]
    .sort((item1, item2) => item2.comments.length - item1.comments.length),
};

const repaint = (evt, filter, data) => {
  const filteredPhotos = filterHandlers[filter](data);
  startGallery(filteredPhotos);
  const currentActiveElement = filterForm.querySelector('.img-filters__button--active');
  currentActiveElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const debouncedRepaint = debounce(repaint);

const startFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, filterList.DEFAULT, data);
  });
  randomButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, filterList.RANDOM, data);
  });
  discussedButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, filterList.DISCUSSED, data);
  });
};

export { startFilter };
