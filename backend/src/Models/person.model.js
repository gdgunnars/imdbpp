import populateMedia from "../common/populateMedia";
import setImagePath from "../common/setImagePath";
import { uniqBy } from "lodash";

const getKnownForMoviesAndTvs = combined => {
  const populated = populateMedia(combined);

  const moviesAndTvShows = populated.reduce(
    (prev, curr) => {
      if (curr.type === "tv") {
        prev.tvShows.push(curr);
      }
      if (curr.type === "movie") {
        prev.movies.push(curr);
      }
      return prev;
    },
    { tvShows: [], movies: [] }
  );
  moviesAndTvShows.movies = uniqBy(moviesAndTvShows.movies, item => item.id);
  moviesAndTvShows.tvShows = uniqBy(moviesAndTvShows.tvShows, item => item.id);
  return moviesAndTvShows;
};

const person = ({
  character,
  id,
  name,
  profile_path,
  department,
  job,
  known_for,
  popularity,
  biography,
  birthday,
  deathday,
  known_for_department,
  combined_credits = { cast: [], crew: [] }
}) => ({
  character,
  popularity,
  birthday,
  deathday,
  id,
  name,
  posterPath: setImagePath(profile_path),
  type: "person",
  department,
  job,
  biography,
  knownForDepartment: known_for_department,
  knownFor: uniqBy(populateMedia(known_for), item => item.id),
  ...getKnownForMoviesAndTvs(combined_credits.cast)
});

export default person;
