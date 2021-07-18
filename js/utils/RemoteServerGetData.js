import {firstInitializeThumbnails} from './ThumbnailsRendering.js';
import {isEscEvent} from './util.js';
import {activateFilters} from './Filters.js';

const showFormErrorMess = (error) => {
  const formErrorMessTemplateFragment = document.querySelector('#error').content;
  const formErrorMessTemplate = formErrorMessTemplateFragment.querySelector('section.error');
  const fragment = document.createDocumentFragment();
  const element = formErrorMessTemplate.cloneNode(true);
  const elementTitle = element.querySelector('.error__title');
  elementTitle.textContent = error;
  elementTitle.style['line-height'] = '1.05em';
  element.querySelector('.error__button').textContent = 'Oк';
  fragment.appendChild(element);
  document.querySelector('body').appendChild(fragment);

  const formErrorKeyDownHandler = (evt) => {
    if(isEscEvent(evt)) {
      document.querySelector('section.error').remove();
      document.removeEventListener('keydown', formErrorKeyDownHandler);
    }
  };
  const closeFormErrorMess = () => {
    document.querySelector('section.error').remove();
    document.removeEventListener('keydown', formErrorKeyDownHandler);
  };

  const formErrorOverlayClick = (evt) => {
    if(evt.target.classList.contains('error')) {
      closeFormErrorMess();
    }
  };

  document.addEventListener('keydown', formErrorKeyDownHandler);
  document.querySelector('.error__button').addEventListener('click', closeFormErrorMess);
  document.querySelector('section.error').addEventListener('click', formErrorOverlayClick);
};

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      const {statusText, status} = response;
      throw new Error(`Произошла ошибка загрузки данных с сервера:\r\n \r\n${status} - ${statusText}`);
    })
  .then((photos) => {
    firstInitializeThumbnails(photos);
    activateFilters(photos);
  })
  .catch((error) => {
    showFormErrorMess(error);
  });
