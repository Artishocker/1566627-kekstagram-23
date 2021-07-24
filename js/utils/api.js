const getData = (onSuccess, onFail) => {
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
      onSuccess(photos);
    })
    .catch((error) => {
      onFail(error);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      'method': 'POST',
      'body': body,
    },
  ).then(
    (response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error('Произошла ошибка');
    },
  ).catch(
    () => {
      onFail();
    },
  );
};

export {getData, sendData};
