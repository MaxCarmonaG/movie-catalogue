import z from "zod";
import { Actor } from ".";
import { TMDB_BASE_IMAGE_URL } from "@env";

const BASE_IMAGE_URL = TMDB_BASE_IMAGE_URL;

const runtimeFormatter = (minutes: number) => {
  if (minutes < 0) return "";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let result = "";
  if (hours > 0) result += `${hours}h `;
  if (mins > 0) result += `${mins}m`;

  return result.trim();
};

const castFormatter = (cast: Actor[], slice?: number) => {
  const sliced = slice ? cast.slice(0, slice) : [...cast];

  return sliced.filter((actor) => actor.profilePath !== BASE_IMAGE_URL);
};

export const MovieZ = z
  .object({
    id: z.preprocess((val) => String(val), z.string()),
    title: z.string().default("Unknown"),
    genre_ids: z
      .array(z.preprocess((val) => String(val), z.string()))
      .default([]),
    release_date: z.string(),
    poster_path: z.string(),
  })
  .strip()
  .transform(({ poster_path, release_date, ...rest }) => ({
    ...rest,
    posterPath: BASE_IMAGE_URL + poster_path,
    year: new Date(release_date).getFullYear(),
    genres: "",
  }));

export const MovieListZ = z.array(MovieZ).transform((list) => list.slice(0, 5));

export const GenreZ = z
  .object({
    id: z.preprocess((val) => String(val), z.string()),
    name: z.string().default("Unknown"),
  })
  .strip();

export const GenreListZ = z.array(GenreZ);

const ActorBase = z
  .object({
    id: z.preprocess((val) => String(val), z.string()),
    name: z.string().default("Unknown"),
    profile_path: z.string().nullable(),
  })
  .strip();

export const ActorZ = ActorBase.transform(({ profile_path, ...rest }) => ({
  ...rest,
  profilePath: BASE_IMAGE_URL + profile_path,
}));

export const CrewZ = ActorBase.extend({
  job: z.string().default("Unknown"),
}).transform(({ profile_path, ...rest }) => ({
  ...rest,
  profilePath: BASE_IMAGE_URL + profile_path,
}));

export const MovieDetailZ = z
  .object({
    id: z.preprocess((val) => String(val), z.string()),
    title: z.string().default("Unknown"),
    genres: GenreListZ,
    release_date: z.string(),
    poster_path: z.string(),
    overview: z.string().default("No overview available"),
    runtime: z.preprocess((val) => runtimeFormatter(Number(val)), z.string()),
    credits: z.object({
      cast: z
        .array(ActorZ)
        .transform((cast) => castFormatter(cast, 5))
        .default([]),
      crew: z
        .array(CrewZ)
        .transform((crew) => crew.filter((member) => member.job === "Director"))
        .default([
          { id: "0", name: "Unknown", profilePath: "", job: "Unknown" },
        ]),
    }),
  })
  .strip()
  .transform(({ poster_path, release_date, credits, genres, ...rest }) => ({
    ...rest,
    posterPath: BASE_IMAGE_URL + String(poster_path),
    year: new Date(release_date).getFullYear(),
    cast: credits.cast,
    director: {
      name: credits.crew[0].name,
      profilePath: credits.crew[0].profilePath,
    },
    genre: genres.map((genre) => genre.name).join(", "),
  }));
