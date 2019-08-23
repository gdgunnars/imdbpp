export const getApiKey = () => {
  // Change this for your own key
  return "YOUR-OWN-IMDB-API-KEY-HERE";
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
