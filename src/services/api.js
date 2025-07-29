import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: import.meta.env.VITE_TMDB_TOKEN,
  },
};

//  Anasayfa - Trend filmleri getir
export const fetchTrending = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

//  Film arama
export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

//  Film detayları
export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
  return response.data;
};

//  Oyuncu bilgisi
export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits`,
    options
  );
  return response.data.cast;
};

//  Film incelemeleri
export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews`,
    options
  );
  return response.data.results;
};
