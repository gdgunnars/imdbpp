const durationFormat = (duration) => {
  const hours = Math.floor(duration / 60);
  const mins = duration - hours * 60;
  return `${hours > 0 ? `${hours}h` : ''} ${mins}min`;
};

export default durationFormat;
