import allGenres from "../common/genres";
import setImagePath from "../common/setImagePath";
import populateMedia from "../common/populateMedia";
import { uniqBy } from "lodash";

const movie = ({
  id,
  vote_average,
  genre_ids,
  genres,
  backdrop_path,
  overview,
  poster_path,
  type = "movie",
  title,
  original_title,
  name,
  release_date,
  belongs_to_collection,
  runtime,
  homePage,
  status,
  production_companies,
  revenue,
  budget,
  cast,
  crew,
  similar,
  trailer,
  popularity
}) => ({
  id,
  name: title || original_title || name,
  score: vote_average,
  genres: (genre_ids
    ? genre_ids.map(item => allGenres[type][item])
    : genres
  ).filter(item => typeof item === "object"),
  overview,
  posterPath: setImagePath(poster_path),
  date: release_date,
  backdropPath: setImagePath(backdrop_path),
  collection: populateMedia(belongs_to_collection),
  type,
  duration: runtime,
  homePage,
  status,
  productionCompanies: production_companies,
  revenue,
  budget,
  trailer,
  cast: uniqBy(
    (populateMedia(cast) || []).filter(item => item.hasOwnProperty("type")),
    item => item.id
  ),
  crew: uniqBy(
    (populateMedia(crew) || []).filter(item => item.hasOwnProperty("type")),
    item => item.id
  ),
  similar: populateMedia(similar),
  popularity
});

export default movie;
