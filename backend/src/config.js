export const getApiKey = () => {
  return "c676ad1c06defe8fd668a42c4b030547";
};

export const getBasePath = () => {
  return "https://api.themoviedb.org/3";
};

export const getImageLink = (width, image) => {
  return `https://image.tmdb.org/t/p/w${width}${image}`;
};

export const getYouTubeInfoPath = key => {
  return `http://www.youtube.com/get_video_info?video_id=${key}&el=embedded&ps=default&eurl=&gl=US&hl=en`;
};
