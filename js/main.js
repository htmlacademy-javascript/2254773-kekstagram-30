import './util.js';
import { getPhotosData } from './data.js';
import { getRenderedPhotos } from './photosRenderer.js';

const photos = getPhotosData();
const renderedPhotos = getRenderedPhotos(photos);

document.querySelector('.pictures')?.appendChild(renderedPhotos);
