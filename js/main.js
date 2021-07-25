import './utils/upload-file.js';
import './utils/avatar.js';
import {debounce} from './utils/debounce.js';
import {setFiltersClick} from './utils/user-filter.js';
import {renderThumbnails, firstInitializeThumbnails} from './utils/thumbnails-rendering.js';
import {getData} from './utils/api.js';
import {showGetDataErrorMessage} from './utils/alert-popups.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  firstInitializeThumbnails(photos);
  setFiltersClick(debounce(
    (photosSetByFilter) => renderThumbnails(photosSetByFilter),
    RERENDER_DELAY,
  ), photos);
},
(error) => {
  showGetDataErrorMessage(error);
},
);
