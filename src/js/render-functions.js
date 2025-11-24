import SimpleLightbox from 'simplelightbox';

const refs = {
  galleryList: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  loader: document.querySelector('.loader'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});

export const createGallery = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}">
        </a>
        <ul class="meta">
          <li class="meta-item"><span class="meta-label">Likes</span> ${likes}</li>
          <li class="meta-item"><span class="meta-label">Views</span> ${views}</li>
          <li class="meta-item"><span class="meta-label">Comments</span> ${comments}</li>
          <li class="meta-item"><span class="meta-label">Downloads</span> ${downloads}</li>
        </ul>
      </li>`
    )
    .join('');

  refs.galleryList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const clearGallery = () => {
  refs.galleryList.innerHTML = '';
};

export const hideLoader = () => {
  refs.loader.classList.add('is-hidden');
};
export const showLoader = () => {
  refs.loader.classList.remove('is-hidden');
};
