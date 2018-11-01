import $get from './axios.middleware';
import basePath from './config.service';
import ClientDataStorage from './clientData.storage';

/* Methods used in HomeScreen */
const getRecommendedCombined = () => $get(`${basePath}/recommended`);

const getTrendingCombined = () => $get(`${basePath}/trending`);

/* Method used in MovieDetailScreen */
const getMovieById = id => ClientDataStorage.getMovieById(id);
const fetchMovieById = id => $get(`${basePath}/movie/${id}`);

/* Method used in TvShowDetailScreen */
const getTvShowById = id => ClientDataStorage.getTvShowById(id);
const fetchTvShowById = id => $get(`${basePath}/tvshow/${id}`);

/* Method used in PersonDetailScreen */
const getPersonById = id => ClientDataStorage.getPeopleById(id);

/* Method used in MovieScreen */
const getTopRatedMovies = () => $get(`${basePath}/topratedmovies`);
const getMoviesByGenre = genre => $get(`${basePath}/movies?genre=${genre}`);

/* Method used in TvShowScreen */
const getTopRatedTv = () => $get(`${basePath}/topratedtv`);
const getTvByGenre = genre => $get(`${basePath}/tv?genre=${genre}`);

export {
  getRecommendedCombined,
  getTrendingCombined,
  getMovieById,
  getTvShowById,
  getPersonById,
  fetchTvShowById,
  fetchMovieById,
  getTopRatedMovies,
  getMoviesByGenre,
  getTopRatedTv,
  getTvByGenre,
};
