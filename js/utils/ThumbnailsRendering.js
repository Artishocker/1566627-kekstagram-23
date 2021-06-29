import {similarPhotoDescriptions} from './PhotoDescription.js';

const renderThumbnail = (Pictures) => {
  const picturesBlock = document.querySelector('.pictures');
  const thumbsTemplateFragment = document.querySelector('#picture').content;
  const thumbsTemplate = thumbsTemplateFragment.querySelector('a');
  const fragment = document.createDocumentFragment();
  for (let pic = 0; pic < Pictures.length; pic++) {
    const element = thumbsTemplate.cloneNode(true);
    element.dataset.picId = Pictures[pic].id;
    element.children[0].src = Pictures[pic].url;
    element.children[1].children[0].textContent = Pictures[pic].comments.length;
    element.children[1].children[1].textContent = Pictures[pic].likes;
    fragment.appendChild(element);
  }
  picturesBlock.appendChild(fragment);
};
renderThumbnail(similarPhotoDescriptions);
export * from './ThumbnailsRendering.js';
