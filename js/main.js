/* global _:readonly */
import './utils/upload-file.js';
//import './utils/remote-server-get-data.js';
import {debounce} from './utils/debounce.js';
import {setFiltersClick} from './utils/user-filter.js';
import {renderThumbnails} from './utils/thumbnails-rendering.js';
import {getData} from './utils/api.js';

const RERENDER_DELAY = 500;


getData((photos) => {

  renderThumbnails(photos);
  setFiltersClick(debounce(
    (newPhotos) => renderThumbnails(newPhotos),
    RERENDER_DELAY,
  ), photos);
/*
  setFiltersClick(
    (newPhotos) => renderThumbnails(newPhotos),
    photos);
*/
  /*setCoatClick(_.debounce(
    () => renderThumbnails(wizards),
    RERENDER_DELAY,
  ));*/
});
