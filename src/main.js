import iziToast from 'izitoast';
import iconPath from './img/octagon.svg';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  smoothScroll,
} from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('input'),
  loadMoreBtn: document.querySelector('.load-btn'),
};

let query = '';
let loadedCount = 0;
let page = 1;
let totalHits = 0;

const onFormSubmit = async event => {
  event.preventDefault();

  query = refs.input.value.trim();
  page = 1;
  loadedCount = 0;

  hideLoadMoreBtn();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search term.',
      iconUrl: iconPath,
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    refs.form.reset();
    clearGallery();
    return;
  }

  showLoader();
  clearGallery();

  try {
    const data = await getImagesByQuery(query, page);
    const hits = Array.isArray(data.hits) ? data.hits : [];
    totalHits = data.totalHits;
    loadedCount += hits.length;

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
    if (loadedCount < totalHits) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      iconUrl: iconPath,
      message: 'Something went wrong. Please try again later.',
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    refs.form.reset();
  }
};

const onLoadMoreBtn = async () => {
  page += 1;
  showLoader();
  hideLoadMoreBtn();

  try {
    const data = await getImagesByQuery(query, page);
    const hits = data.hits;

    if (hits.length === 0) {
      hideLoadMoreBtn();
      return;
    }

    createGallery(hits);

    loadedCount += hits.length;

    if (loadedCount < totalHits) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
      iziToast.error({
        iconUrl: iconPath,
        message: 'We`re sorry, but you`ve reached the end of search results.',
        messageColor: '#fafafb',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images.',
      iconUrl: iconPath,
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
