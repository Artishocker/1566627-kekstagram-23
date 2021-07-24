import {renderBigPicture} from './show-big-picture.js';

const picturesBlock = document.querySelector('.pictures');

const removeRenderedThumbnails = () => {
  const renderedThumbnails = document.querySelectorAll('.pictures .picture');
  renderedThumbnails.forEach( (picture) => {
    picture.remove();
  });
};

export const renderThumbnails = (pictures) => {
  const thumbsTemplateFragment = document.querySelector('#picture').content;
  const thumbsTemplate = thumbsTemplateFragment.querySelector('a');
  const fragment = document.createDocumentFragment();
  for (let pic = 0; pic < pictures.length; pic++) {
    const element = thumbsTemplate.cloneNode(true);
    element.dataset.picId = pictures[pic].id;
    element.children[0].src = pictures[pic].url;
    element.children[1].children[0].textContent = pictures[pic].comments.length;
    element.children[1].children[1].textContent = pictures[pic].likes;
    fragment.appendChild(element);
  }

  removeRenderedThumbnails();

  picturesBlock.appendChild(fragment);
};

export const firstInitializeThumbnails = (pictures) => {
  const picturesBlockClickHandler = (evt) => renderBigPicture(evt, pictures);
  picturesBlock.addEventListener('click', picturesBlockClickHandler);
  renderThumbnails(pictures);
};

export * from './thumbnails-rendering.js';
