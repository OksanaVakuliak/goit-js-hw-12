import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53362257-c14ece9c0fcc787c0ab59abe3';

export const getImagesByQuery = query => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(BASE_URL, { params }).then(response => response.data);
};
