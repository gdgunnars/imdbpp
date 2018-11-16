const typeToRouteName = (type) => {
  console.log(type);
  if (type === 'person') {
    return 'PersonDetail';
  }
  return 'MovieTvDetail';
};

const mediaLink = (d) => {
  const { type, id } = d;
  console.log(d);
  const routeName = typeToRouteName(type);
  const data = { type, id };
  return { routeName, params: { data } };
};

export default mediaLink;
