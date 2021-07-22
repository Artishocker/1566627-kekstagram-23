import {firstInitializeThumbnails} from './thumbnails-rendering.js';
import {isEscEvent} from './util.js';
import {activateFilters} from './user-filter.js';

const showFormErrorMessage = (error) => {
  const formErrorMessageTemplateFragment = document.querySelector('#error').content;
  const formErrorMessageTemplate = formErrorMessageTemplateFragment.querySelector('section.error');
  const fragment = document.createDocumentFragment();
  const element = formErrorMessageTemplate.cloneNode(true);
  const elementTitle = element.querySelector('.error__title');
  elementTitle.textContent = error;
  elementTitle.style['line-height'] = '1.05em';
  element.querySelector('.error__button').textContent = 'Oк';
  fragment.appendChild(element);
  document.querySelector('body').appendChild(fragment);
  const errorSection = document.querySelector('section.error');

  const formErrorKeyDownHandler = (evt) => {
    if(isEscEvent(evt)) {
      errorSection.remove();
      document.removeEventListener('keydown', formErrorKeyDownHandler);
    }
  };
  const closeFormErrorMessage = () => {
    errorSection.remove();
    document.removeEventListener('keydown', formErrorKeyDownHandler);
  };
  const errorOkButtonClickHandler = () => {
    closeFormErrorMessage();
  };
  const formErrorOverlayClickHandler = (evt) => {
    if(evt.target.classList.contains('error')) {
      closeFormErrorMessage();
    }
  };

  document.addEventListener('keydown', formErrorKeyDownHandler);
  document.querySelector('.error__button').addEventListener('click', errorOkButtonClickHandler);
  errorSection.addEventListener('click', formErrorOverlayClickHandler);
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
    showFormErrorMessage(error);
  });
