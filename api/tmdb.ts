import axios from "axios";
import { TMDB_ACCESS_TOKEN } from "@env";

export type Actor = {
  id: string;
  name: string;
  profilePath: string;
};

const API_KEY = TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

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

  if (response.config.params?.append_to_response) {
    response.data = movieDetailSanitizer(response.data);
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

export const getMovieDetails = async (movieId: string): Promise<any> => {
  return fetchMovies(`/movie/${movieId}`, { append_to_response: "credits" });
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

const movieDetailSanitizer = (item: any) => {
  return {
    id: String(item.id),
    title: (item.title || "Unknown") as string,
    genre: (item.genres[0]?.name || "Unknown") as string,
    year: new Date(item.release_date).getFullYear(),
    posterPath: BASE_IMAGE_URL + item.poster_path,
    overview: (item.overview || "No overview available") as string,
    runtime: runtimeFormatter(item.runtime),
    cast: castFormatter(item.credits?.cast || []),
    director: directorFormatter(item.credits?.crew || []),
  };
};

const runtimeFormatter = (minutes: any) => {
  if (typeof minutes !== "number" || minutes < 0) return "";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let result = "";
  if (hours > 0) result += `${hours}h `;
  if (mins > 0) result += `${mins}m`;

  return result.trim();
};

const castFormatter = (cast: any[]) => {
  return cast
    .slice(0, 5)
    .filter((actor: any) => actor.profile_path)
    .map((actor: any) => ({
      id: String(actor.id),
      name: actor.name,
      profilePath: BASE_IMAGE_URL + actor.profile_path,
    })) as Actor[];
};

const directorFormatter = (
  crew: any[]
): { name: string; profilePath: string } => {
  const director = crew.find((member: any) => member.job === "Director");

  if (director) {
    return {
      name: director.name,
      profilePath: BASE_IMAGE_URL + director.profile_path,
    };
  }

  return {
    name: "Unknown",
    profilePath: "",
  };
};
