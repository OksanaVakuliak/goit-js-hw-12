import iziToast from 'izitoast';
import iconPath from './img/octagon.svg';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('input'),
};

const onFormSubmit = event => {
  event.preventDefault();

  const query = refs.input.value.trim();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search term.',
      iconUrl: iconPath,
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    refs.form.reset();
    return;
  }

  showLoader();
  clearGallery();

  getImagesByQuery(query)
    .then(data => {
      const hits = Array.isArray(data.hits) ? data.hits : [];

      if (hits.length === 0) {
        iziToast.error({
          iconUrl: iconPath,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fafafb',
          backgroundColor: '#ef4040',
          position: 'topRight',
        });
        return;
      }
      createGallery(hits);
    })
    .catch(error => {
      iziToast.error({
        iconUrl: iconPath,
        message: 'Something went wrong. Please try again later.',
        messageColor: '#fafafb',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      refs.form.reset();
    });
};

refs.form.addEventListener('submit', onFormSubmit);
