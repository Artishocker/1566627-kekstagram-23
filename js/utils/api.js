export const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    });
};
