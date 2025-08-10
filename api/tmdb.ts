import axios from "axios";
import { TMDB_ACCESS_TOKEN } from "@env";

const API_KEY = TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w200";

const apiMovie = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

apiMovie.interceptors.response.use((response) => {
  if (response.data?.results?.length) {
    const results = response.data.results.slice(0, 5).map(movieListSanitizer);
    response.data.results = results;
  }

  if (response.data?.genres?.length) {
    const genres = response.data.genres.map(genreListSanitizer);
    response.data.genres = genres;
  }

  return response;
});

const fetchMovies = async (
  endpoint: string,
  params?: { [key: string]: string }
): Promise<any> => {
  try {
    const response = await apiMovie.get(endpoint, params && { params });
    if (response.status !== 200) {
      throw new Error("Failed to fetch movies");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:" + endpoint, error);
    throw error;
  }
};

export const getNowPlayingMovies = async (): Promise<any> => {
  return fetchMovies("/movie/now_playing");
};

export const getUpcomingMovies = async (): Promise<any> => {
  return fetchMovies("/movie/upcoming");
};

export const getMovieGenres = async (): Promise<any> => {
  return fetchMovies("/genre/movie/list");
};

const movieListSanitizer = (item: any) => {
  return {
    id: String(item.id),
    title: item.title || "Unknown",
    genre_ids: item.genre_ids?.map(String) || [],
    genres: "",
    year: new Date(item.release_date).getFullYear(),
    posterPath: BASE_IMAGE_URL + item.poster_path,
  };
};

const genreListSanitizer = (item: any) => {
  return {
    id: String(item.id),
    name: item.name || "Unknown",
  };
};
