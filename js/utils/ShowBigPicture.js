import {similarPhotoDescriptions as pictures} from './PhotoDescription.js';

const renderComments = (Comments) => {
  const commentsBlock = document.querySelector('.social__comments');
  const commentTemplateFragment = document.querySelector('#socialComments').content;
  const commentTemplate = commentTemplateFragment.querySelector('li');
  const fragment = document.createDocumentFragment();
  for (let comm = 0; comm < Comments.length; comm++) {
    const element = commentTemplate.cloneNode(true);
    element.dataset.commId = Comments[comm].id;
    element.children[0].src = Comments[comm].avatar;
    element.children[0].alt = Comments[comm].name;
    element.children[1].textContent = Comments[comm].message;
    fragment.appendChild(element);
  }
  commentsBlock.innerHTML = '';
  commentsBlock.appendChild(fragment);
};

const thumbnailClick = (evt) => {
  evt.preventDefault();
  if(evt.target.parentNode.classList.contains('picture')) {
    const picId = evt.target.parentNode.dataset.picId;
    const chosenPicture = pictures.find( (item) => item.id === +picId);
    const bigPictureWrap = document.querySelector('.big-picture');
    bigPictureWrap.querySelector('.big-picture__img img').src = chosenPicture.url;
    bigPictureWrap.querySelector('.likes-count').textContent = chosenPicture.likes;
    bigPictureWrap.querySelector('.comments-count').textContent = chosenPicture.comments.length;
    bigPictureWrap.querySelector('.social__caption').textContent = chosenPicture.description;
    renderComments(chosenPicture.comments);
    bigPictureWrap.classList.remove('hidden');
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  }
};

const closeBigPicture = () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const keyDownHandler = (evt) => {
  if(evt.keyCode === 27) {
    closeBigPicture();
  }
};

document.querySelector('.pictures').addEventListener('click', thumbnailClick);
document.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
document.addEventListener('keydown', keyDownHandler);
export * from './ShowBigPicture.js';
