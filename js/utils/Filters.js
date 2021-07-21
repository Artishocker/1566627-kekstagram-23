import {renderThumbnails} from './thumbnails-rendering.js';
import {getRandomSetFromArr} from './util.js';
import {debounce} from './debounce.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_QUANTITY = 10;

const getMostCommentedPhotos = (photos) => {
  const sortedPhotos = photos.slice();
  sortedPhotos.sort( (first, second) => (second.comments.length - first.comments.length)  );
  return sortedPhotos;
};

export const activateFilters = (pictures) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  const filtersChange = (evt, photos) => {
    const clickedElement = evt.target;
    if(clickedElement.classList.contains('img-filters__button')) {
      document.querySelector('.img-filters__form .img-filters__button--active').classList.remove('img-filters__button--active');
      clickedElement.classList.add('img-filters__button--active');
      switch(clickedElement.id) {
        case 'filter-random':
          renderThumbnails(getRandomSetFromArr(photos, RANDOM_PHOTOS_QUANTITY));
          break;
        case 'filter-discussed':
          renderThumbnails(getMostCommentedPhotos(photos));
          break;
        case 'filter-default':
        default:
          renderThumbnails(photos);
          break;
      }
    }
  };

  const filtersClickHandler = (evt) => {
    filtersChange(evt, pictures);
  };

  document.querySelector('.img-filters__form').addEventListener('click', debounce(filtersClickHandler, RERENDER_DELAY));
};
