import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/tmdb";

type MovieDetails = {
  id: string;
  title: string;
  genre: string;
  year: number;
  posterPath: string;
  overview: string;
  runtime: string;
  cast: {
    id: string;
    name: string;
    profilePath: string;
  }[];
  director: {
    name: string;
    profilePath: string;
  };
};

export default function useMovieDetails(id: string) {
  const [details, setDetails] = useState<MovieDetails>({
    id: "",
    title: "",
    genre: "",
    year: 0,
    posterPath: "",
    overview: "",
    runtime: "",
    cast: [],
    director: {
      name: "",
      profilePath: "",
    },
  });

  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, []);

  return { details, error, loading };
}
