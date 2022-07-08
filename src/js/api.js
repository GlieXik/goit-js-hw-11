import axios from 'axios';
export let page = 1;
export const api = async tag => {
  const searchParams = new URLSearchParams({
    key: '28372549-e090c48611b383f38160db719',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    q: tag,
    per_page: 40,
  });
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams}`
    );
    return response.data;
  } catch (error) {
    console.log('error');
  }
};
export const resetPage = () => {
  return (page = 1);
};
export const addPage = () => page++;
