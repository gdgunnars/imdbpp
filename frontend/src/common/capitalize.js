const capitalize = (text) => {
  const [firstLetter, ...rest] = text;
  return [firstLetter.toUpperCase(), ...rest].join('');
};

export default capitalize;
