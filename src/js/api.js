import axios from 'axios';
let page = 1;
export const api = async tag => {
  const searchParams = name =>
    new URLSearchParams({
      key: '28372549-e090c48611b383f38160db719',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      q: name,
    });
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams(tag)}`
    );

    page++;
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
};
