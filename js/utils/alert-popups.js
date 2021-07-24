import {isEscEvent} from './util.js';

const body = document.querySelector('body');

export const showGetDataErrorMessage = (error) => {
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

export const showFormSuccessMessage = () => {
  const formSuccessMessageTemplateFragment = document.querySelector('#success').content;
  const formSuccessMessageTemplate = formSuccessMessageTemplateFragment.querySelector('section.success');
  const fragment = document.createDocumentFragment();
  const element = formSuccessMessageTemplate.cloneNode(true);
  fragment.appendChild(element);
  body.appendChild(fragment);
  const successSection = document.querySelector('section.success');

  const formSuccessKeyDownHandler = (evt) => {
    if(isEscEvent(evt)) {
      successSection.remove();
      document.removeEventListener('keydown', formSuccessKeyDownHandler);
    }
  };
  const closeFormSuccessMessage = () => {
    successSection.remove();
    document.removeEventListener('keydown', formSuccessKeyDownHandler);
  };

  const formSuccessButtonClickHandler = () => {
    closeFormSuccessMessage();
  };
  const formSuccessOverlayClickHandler = (evt) => {
    if(evt.target.classList.contains('success')) {
      closeFormSuccessMessage();
    }
  };

  document.addEventListener('keydown', formSuccessKeyDownHandler);
  document.querySelector('.success__button').addEventListener('click', formSuccessButtonClickHandler);
  successSection.addEventListener('click', formSuccessOverlayClickHandler);
};

export const showFormErrorMessage = () => {
  const formErrorMessageTemplateFragment = document.querySelector('#error').content;
  const formErrorMessageTemplate = formErrorMessageTemplateFragment.querySelector('section.error');
  const fragment = document.createDocumentFragment();
  const element = formErrorMessageTemplate.cloneNode(true);
  fragment.appendChild(element);
  body.appendChild(fragment);
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
  const formErrorOverlayClick = (evt) => {
    if(evt.target.classList.contains('error')) {
      closeFormErrorMessage();
    }
  };

  document.addEventListener('keydown', formErrorKeyDownHandler);
  document.querySelector('.error__button').addEventListener('click', closeFormErrorMessage);
  errorSection.addEventListener('click', formErrorOverlayClick);
};

/*
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
*/
