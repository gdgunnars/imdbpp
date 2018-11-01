import $get from './axios.middleware';
import basePath from './config.service';
import ClientDataStorage from './clientData.storage';

/* Methods used in HomeScreen */
const getRecommendedCombined = () => $get(`${basePath}/recommended`);

const getTrendingCombined = () => $get(`${basePath}/trending`);

/* Method used in MovieDetailScreen */
const getMovieById = id => ClientDataStorage.getMovieById(id);

/* Method used in TvShowDetailScreen */
const getTvShowById = id => ClientDataStorage.getTvShowById(id);
const fetchTvShowById = id => $get(`${basePath}/tvshow/${id}`);

/* Method used in PersonDetailScreen */
const getPersonById = id => ClientDataStorage.getPeopleById(id);

export {
  getRecommendedCombined,
  getTrendingCombined,
  getMovieById,
  getTvShowById,
  getPersonById,
  fetchTvShowById,
};
