import populateMedia from "../common/populateMedia";
import setImagePath from "../common/setImagePath";

const getKnownForMoviesAndTvs = combined => {
  const populated = populateMedia(combined);
  return populated.reduce(
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
  knownFor: populateMedia(known_for),
  ...getKnownForMoviesAndTvs(combined_credits.cast)
});

export default person;
