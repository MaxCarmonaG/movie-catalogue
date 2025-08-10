import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  getMovieGenres,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "../api/tmdb";

type Movie = {
  id: string;
  title: string;
  genre_ids: string[];
  genres: string;
  year: number;
  posterPath: string;
};

type Genre = {
  id: string;
  name: string;
};

type ListState<T> = {
  list: T[];
  loading: boolean;
  error: unknown | null;
};

export default function useMovie() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<ListState<Movie>>({
    list: [],
    loading: true,
    error: null,
  });

  const [upcomingMovies, setUpcomingMovies] = useState<ListState<Movie>>({
    list: [],
    loading: true,
    error: null,
  });

  const [movieGenres, setMovieGenres] = useState<ListState<Genre>>({
    list: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    Promise.all([
      fetchMovieGenres(),
      fetchNowPlayingMovies(),
      fetchUpcomingMovies(),
    ]).then(([genres]) => {
      if (!genres) return;
      genreMapper([setNowPlayingMovies, setUpcomingMovies], genres);
    });
  }, []);

  const movieFetcher = async <T,>(
    setter: Dispatch<SetStateAction<ListState<T>>>,
    fetcher: () => Promise<any>,
    accessor: string
  ) => {
    try {
      const list = (await fetcher())[accessor] as T[];
      setter((prev) => ({
        ...prev,
        list,
      }));
      return list;
    } catch (err) {
      setter((prev) => ({
        ...prev,
        error: err,
      }));
    } finally {
      setter((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const fetchNowPlayingMovies = async () =>
    await movieFetcher<Movie>(
      setNowPlayingMovies,
      getNowPlayingMovies,
      "results"
    );
  const fetchUpcomingMovies = async () =>
    await movieFetcher<Movie>(setUpcomingMovies, getUpcomingMovies, "results");
  const fetchMovieGenres = async () =>
    await movieFetcher<Genre>(setMovieGenres, getMovieGenres, "genres");

  const genreMapper = (
    setterArr: Dispatch<SetStateAction<ListState<Movie>>>[],
    genreList: Genre[]
  ) => {
    setterArr.forEach((setter) => {
      setter((prev) => ({
        ...prev,
        list: prev.list.map((item) => ({
          ...item,
          genres: item.genre_ids
            .map(
              (id: string) =>
                genreList.find((genre) => genre.id === id)?.name || "Unknown"
            )
            .join(", "),
        })),
      }));
    });
  };

  return { nowPlayingMovies, upcomingMovies };
}
