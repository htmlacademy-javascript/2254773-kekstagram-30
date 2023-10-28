import './util.js';
import {PHOTOS_COUNT, createPhoto} from './data.js';

Array.from({ length: PHOTOS_COUNT }, createPhoto);
