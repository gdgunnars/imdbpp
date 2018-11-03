import populateMedia from '../common/populateMedia';
import setImagePath from '../common/setImagePath';
const person = ({ character, id, name, profile_path, department, job, known_for }) => ({
  character,
  id,
  name,
  profilePath: setImagePath(profile_path),
  type: "person",
  department,
  job,
  knownFor: populateMedia(known_for),
});

export default person;
