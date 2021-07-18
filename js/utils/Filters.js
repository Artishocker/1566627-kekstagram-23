import {renderThumbnail} from './ThumbnailsRendering.js';
import {getRandomSetFromArr} from './util.js';
import {debounce} from './debounce.js';

const RERENDER_DELAY = 500;

const getMostCommentedPhotos = (photos) => {
  const sortPhotos = photos.slice();
  sortPhotos.sort( (first, second) => (second.comments.length - first.comments.length)  );
  return sortPhotos;
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
          debounce(renderThumbnail(getRandomSetFromArr(photos, 10)));
          break;
        case 'filter-discussed':
          debounce(renderThumbnail(getMostCommentedPhotos(photos)), RERENDER_DELAY);
          break;
        case 'filter-default':
        default:
          debounce(renderThumbnail(photos), RERENDER_DELAY);
          break;
      }
    }
  };

  const filtersClickHandler = (evt) => {
    filtersChange(evt, pictures);
  };

  document.querySelector('.img-filters__form').addEventListener('click', filtersClickHandler);
};
