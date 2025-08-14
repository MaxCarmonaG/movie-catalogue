import axios from "axios";
import { TMDB_ACCESS_TOKEN, TMDB_BASE_URL } from "@env";
import { GenreListZ, MovieDetailZ, MovieListZ } from "../types/validators";
import { GenreList, MovieDetails, MovieList } from "../types";

const API_KEY = TMDB_ACCESS_TOKEN;
const BASE_URL = TMDB_BASE_URL;

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
    const results = MovieListZ.safeParse(response.data.results);
    response.data.results = results.success ? results.data : [];
  }

  if (response.data?.genres?.length) {
    const genres = GenreListZ.safeParse(response.data.genres);
    response.data.genres = genres.success ? genres.data : [];
  }

  if (response.config.params?.append_to_response) {
    const details = MovieDetailZ.safeParse(response.data);
    response.data = details.success ? details.data : { director: {}, cast: [] };
  }

  return response;
});

const fetchMovies = async <T>(
  endpoint: string,
  params?: { [key: string]: string }
) => {
  try {
    const response = await apiMovie.get<T>(endpoint, params && { params });
    if (response.status !== 200) {
      throw new Error("Failed to fetch movies");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:" + endpoint, error);
    throw error;
  }
};

export const getNowPlayingMovies = async () => {
  return fetchMovies<MovieList>("/movie/now_playing");
};

export const getUpcomingMovies = async () => {
  return fetchMovies<MovieList>("/movie/upcoming");
};

export const getMovieGenres = async () => {
  return fetchMovies<{ genres: GenreList }>("/genre/movie/list");
};

export const getMovieDetails = async (movieId: string) => {
  return fetchMovies<MovieDetails>(`/movie/${movieId}`, {
    append_to_response: "credits",
  });
};
