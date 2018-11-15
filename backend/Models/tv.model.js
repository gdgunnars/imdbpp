import allGenres from "../common/genres";
import setImagePath from "../common/setImagePath";
import populateMedia from "../common/populateMedia";
import { uniqBy } from "lodash";

const tv = ({
  id,
  vote_average,
  genre_ids,
  genres,
  backdrop_path,
  overview,
  poster_path,
  type = "tv",
  name,
  original_name,
  first_air_date,
  created_by,
  episode_run_time,
  homepage,
  status,
  number_of_episodes,
  number_of_seasons,
  production_companies,
  networks,
  cast,
  crew,
  similar,
  trailer,
  popularity
}) => ({
  id,
  name: name || original_name,
  score: vote_average,
  posterPath: setImagePath(poster_path),
  genres: (genre_ids
    ? genre_ids.map(item => allGenres[type][item])
    : genres
  ).filter(item => typeof item === "object"),
  overview,
  date: first_air_date,
  backdropPath: setImagePath(backdrop_path),
  type,
  trailer,
  createdBy: populateMedia(created_by),
  duration:
    episode_run_time && episode_run_time.length > 0
      ? episode_run_time[0]
      : null,
  homepage,
  status,
  episodesCount: number_of_episodes,
  seasonsCount: number_of_seasons,
  productionCompanies: production_companies,
  networks,
  cast: uniqBy(populateMedia(cast), item => item.id),
  crew: uniqBy(populateMedia(crew), item => item.id),
  similar: populateMedia(similar),
  popularity
});

export default tv;
