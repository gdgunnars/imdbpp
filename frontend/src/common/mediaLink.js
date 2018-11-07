const typeToRouteName = (type) => {
  if (type === 'person') {
    return 'PersonDetail';
  }
  return 'MovieTvDetail';
};

const mediaLink = ({ type, id }) => {
  const routeName = typeToRouteName(type);
  const data = { type, id };
  return { routeName, params: { data } };
};

export default mediaLink;
