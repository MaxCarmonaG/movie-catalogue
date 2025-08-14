import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/tmdb";
import { MovieDetails } from "../types";

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
