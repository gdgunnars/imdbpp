const person = ({ character, id, name, gender, profile_path }) => ({
  character,
  id,
  name,
  profilePath: profile_path,
  type: "person"
});

export default person;
