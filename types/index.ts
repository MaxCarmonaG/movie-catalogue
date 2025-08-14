import z from "zod";
import {
  ActorZ,
  GenreListZ,
  GenreZ,
  MovieDetailZ,
  MovieListZ,
  MovieZ,
} from "./validators";

export type Actor = z.infer<typeof ActorZ>;
export type Movie = z.infer<typeof MovieZ>;
export type Genre = z.infer<typeof GenreZ>;
export type MovieDetails = z.infer<typeof MovieDetailZ>;

export type MovieList = z.infer<typeof MovieListZ>;
export type GenreList = z.infer<typeof GenreListZ>;

export type ListState<T> = {
  list: T[];
  loading: boolean;
  error: unknown | null;
};
