const typeToRoutePath = (type) => {
  if (type === 'movie') {
    return 'MovieDetail';
  }
  if (type === 'tv') {
    return 'TvShowDetail';
  }
  if (type === 'person') {
    return 'PersonDetail';
  }
  return '';
};

export default typeToRoutePath;
