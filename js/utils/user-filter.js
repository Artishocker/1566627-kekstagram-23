import {renderThumbnails} from './thumbnails-rendering.js';

import {getRandomSetFromArray} from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_QUANTITY = 10;

const getMostCommentedPhotos = (photos) => {
  const sortedPhotos = photos.slice();
  sortedPhotos.sort( (first, second) => (second.comments.length - first.comments.length) );
  return sortedPhotos;
};

export const activateFilters = (pictures) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
/*
  const filtersChange = (evt, photos) => {
    const clickedElement = evt.target;
    if(clickedElement.classList.contains('img-filters__button')) {
      document.querySelector('.img-filters__form .img-filters__button--active').classList.remove('img-filters__button--active');
      clickedElement.classList.add('img-filters__button--active');
      switch(clickedElement.id) {
        case 'filter-random':
          debounce(renderThumbnails(getRandomSetFromArray(photos, RANDOM_PHOTOS_QUANTITY)), RERENDER_DELAY);
          break;
        case 'filter-discussed':
          debounce(renderThumbnails(getMostCommentedPhotos(photos)), RERENDER_DELAY);
          break;
        case 'filter-default':
        default:
          debounce(renderThumbnails(photos), RERENDER_DELAY);
          break;
      }
    }
  };

  const filtersClickHandler = (evt) => {
    filtersChange(evt, pictures);
  };

  document.querySelector('.img-filters__form').addEventListener('click', filtersClickHandler);
*/


};

export const setFiltersClick = (cb, photos) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  document.querySelector('.img-filters__form').addEventListener('click', (evt) => {

    const clickedElement = evt.target;
    if(clickedElement.classList.contains('img-filters__button')) {
      document.querySelector('.img-filters__form .img-filters__button--active').classList.remove('img-filters__button--active');
      clickedElement.classList.add('img-filters__button--active');

      let newPhotos;

      switch(clickedElement.id) {
        case 'filter-random':
         // debounce(renderThumbnails(getRandomSetFromArray(photos, RANDOM_PHOTOS_QUANTITY)), RERENDER_DELAY);
          newPhotos = getRandomSetFromArray(photos, RANDOM_PHOTOS_QUANTITY);
          break;
        case 'filter-discussed':
          //debounce(renderThumbnails(getMostCommentedPhotos(photos)), RERENDER_DELAY);
          newPhotos = getMostCommentedPhotos(photos);
          break;
        case 'filter-default':
        default:
          //debounce(renderThumbnails(photos), RERENDER_DELAY);
          newPhotos = photos;
          break;
      }
      cb(newPhotos);



    }
  });



};
