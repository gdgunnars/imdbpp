const capitalize = (text) => {
  if (!text || text === '') {
    return '';
  }
  const [firstLetter, ...rest] = text;
  return [firstLetter.toUpperCase(), ...rest].join('');
};

export default capitalize;
