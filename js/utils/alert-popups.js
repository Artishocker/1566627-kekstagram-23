import {isEscEvent} from './util.js';

const showCustomPopup = (popupName, error) => {
  const messageTemplateFragment = document.querySelector(`#${popupName}`).content;
  const messageTemplate = messageTemplateFragment.querySelector(`section.${popupName}`);
  const fragment = document.createDocumentFragment();
  const element = messageTemplate.cloneNode(true);

  if(error) {
    const elementTitle = element.querySelector(`.${popupName}__title`);
    elementTitle.textContent = error;
    elementTitle.style['line-height'] = '1.05em';
    element.querySelector(`.${popupName}__button`).textContent = 'Oк';
  }

  fragment.appendChild(element);
  document.querySelector('body').appendChild(fragment);
  const popupSection = document.querySelector(`section.${popupName}`);

  const messageInteractions = (evt) => {
    if(evt.target.classList.contains(`${popupName}`) ||
      evt.target.classList.contains(`${popupName}__button`) ||
      isEscEvent(evt)) {
      popupSection.remove();
      document.removeEventListener('keydown', messageInteractions);
    }
  };

  document.addEventListener('keydown', messageInteractions);
  popupSection.addEventListener('click', messageInteractions);
};

export const showFormErrorMessage = () => {
  showCustomPopup('error');
};

export const showFormSuccessMessage = () => {
  showCustomPopup('success');
};

export const showGetDataErrorMessage = (error) => {
  showCustomPopup('error', error);
};
