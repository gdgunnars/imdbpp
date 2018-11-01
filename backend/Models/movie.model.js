import allGenres from "../common/genres";
import setImagePath from "../common/setImagePath";

const movie = ({
  id,
  vote_average,
  genre_ids,
  backdrop_path,
  overview,
  poster_path,
  type = "movie",
  title,
  original_title,
  release_date
}) => ({
  id,
  name: title || original_title,
  score: vote_average,
  genres: genre_ids.map(item => allGenres[type][item]),
  overview,
  posterPath: setImagePath(poster_path),
  date: release_date,
  backdropPath: setImagePath(backdrop_path),
  type
});

export default movie;
