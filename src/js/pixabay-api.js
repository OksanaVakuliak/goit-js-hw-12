import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53362257-c14ece9c0fcc787c0ab59abe3';

export const getImagesByQuery = async (query, page) => {
  const params = {
    key: API_KEY,
    q: query,
    per_page: 15,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
};
