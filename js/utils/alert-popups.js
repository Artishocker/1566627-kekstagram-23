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
  body.appendChild(fragment);
  const errorSection = document.querySelector('section.error');

  const getDataErrorMessageInteractions = (evt) => {
    if(evt.target.classList.contains('error') ||
      evt.target.classList.contains('error__button') ||
      isEscEvent(evt)) {
      errorSection.remove();
      document.removeEventListener('keydown', getDataErrorMessageInteractions);
    }
  };

  document.addEventListener('keydown', getDataErrorMessageInteractions);
  errorSection.addEventListener('click', getDataErrorMessageInteractions);
};

export const showFormSuccessMessage = () => {
  const formSuccessMessageTemplateFragment = document.querySelector('#success').content;
  const formSuccessMessageTemplate = formSuccessMessageTemplateFragment.querySelector('section.success');
  const fragment = document.createDocumentFragment();
  const element = formSuccessMessageTemplate.cloneNode(true);
  fragment.appendChild(element);
  body.appendChild(fragment);
  const successSection = document.querySelector('section.success');

  const formSuccessMessageInteractions = (evt) => {
    if(evt.target.classList.contains('success') ||
      evt.target.classList.contains('success__button') ||
      isEscEvent(evt)) {
      successSection.remove();
      document.removeEventListener('keydown', formSuccessMessageInteractions);
    }
  };
  document.addEventListener('keydown', formSuccessMessageInteractions);
  successSection.addEventListener('click', formSuccessMessageInteractions);
};

export const showFormErrorMessage = () => {
  const formErrorMessageTemplateFragment = document.querySelector('#error').content;
  const formErrorMessageTemplate = formErrorMessageTemplateFragment.querySelector('section.error');
  const fragment = document.createDocumentFragment();
  const element = formErrorMessageTemplate.cloneNode(true);
  fragment.appendChild(element);
  body.appendChild(fragment);
  const errorSection = document.querySelector('section.error');

  const formErrorMessageInteractions = (evt) => {
    if(evt.target.classList.contains('error') ||
      evt.target.classList.contains('error__button') ||
      isEscEvent(evt)) {
      errorSection.remove();
      document.removeEventListener('keydown', formErrorMessageInteractions);
    }
  };

  document.addEventListener('keydown', formErrorMessageInteractions);
  errorSection.addEventListener('click', formErrorMessageInteractions);
};
