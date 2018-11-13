import populateMedia from "../common/populateMedia";
import setImagePath from "../common/setImagePath";
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
  combined_credits = { cast: [], crew: [] }
}) => ({
  character,
  popularity,
  id,
  name,
  posterPath: setImagePath(profile_path),
  type: "person",
  department,
  job,
  biography,
  knownFor: populateMedia(known_for),
  cast: combined_credits.cast
    .sort((a, b) => (a.popularity < b.popularity ? 1 : -1))
    .map(item => ({
      character: item.character || name,
      ...populateMedia(item)
    })),
  crew: combined_credits.crew
    .sort((a, b) => (a.popularity < b.popularity ? 1 : -1))
    .map(item => ({ job: item.job, ...populateMedia(item) }))
});

export default person;
