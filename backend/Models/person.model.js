const person = ({ character, id, name, profile_path, department, job }) => ({
  character,
  id,
  name,
  profilePath: profile_path,
  type: "person",
  department,
  job
});

export default person;
