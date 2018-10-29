import $get from './axios.middleware';
import basePath from './config.service';

const getRecommendedCombined = () => $get(`${basePath}/recommended`);

const getTrendingCombined = () => $get(`${basePath}/trending`);

export { getRecommendedCombined, getTrendingCombined };
