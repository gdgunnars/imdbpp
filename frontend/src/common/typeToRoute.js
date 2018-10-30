const typeToRoutePath = (type) => {
  if (type === 'movie') {
    return 'MovieDetail';
  }
  if (type === 'tv') {
    console.log('IM BINGo');
    return 'TvShowDetail';
  }
  if (type === 'person') {
    return 'PersonDetail';
  }
  return '';
};

export default typeToRoutePath;
