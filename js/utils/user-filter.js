import {getRandomSetFromArray} from './util.js';

const RANDOM_PHOTOS_QUANTITY = 10;

const getMostCommentedPhotos = (photos) => {
  const sortedPhotos = photos.slice();
  sortedPhotos.sort( (first, second) => (second.comments.length - first.comments.length) );
  return sortedPhotos;
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
          newPhotos = getRandomSetFromArray(photos, RANDOM_PHOTOS_QUANTITY);
          break;
        case 'filter-discussed':
          newPhotos = getMostCommentedPhotos(photos);
          break;
        case 'filter-default':
        default:
          newPhotos = photos;
          break;
      }
      cb(newPhotos);

    }
  });
};
