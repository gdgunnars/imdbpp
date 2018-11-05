import { defer, Observable } from 'rxjs';
import basePath from './service.config';

import {
  storeData, retrieveData, storageKeys, clearSessionData,
} from '../storage';
import $get from './api.service';
import { errorCodes } from '../errors';

const createDefer = (key, url) => defer(() => Observable.create(async (observer) => {
  try {
    // Todo: Remove clearSessionData.
    // Uncomment nextLine to clearAllData from LocalDB.
    // await clearSessionData();
    const storageData = await retrieveData(key);
    observer.next(storageData);
    return observer.complete();
  } catch (error) {
    if (error.code === errorCodes.ClientDataStorage.keyNotFound) {
      const apiData = await $get(url);
      observer.next(apiData);
      await storeData(key, apiData);
      return observer.complete();
    }
  }
  return () => `Defer with the key:${key} and url: ${url} was completed`;
}));

const getMovieById = (id) => {
  const key = storageKeys.movie(id);
  const url = `${basePath}/movie/${id}`;
  return createDefer(key, url);
};

const getTvShowById = (id) => {
  const key = storageKeys.tv(id);
  const url = `${basePath}/tvshow/${id}`;
  return createDefer(key, url);
};

const getTrendingCombined = () => {
  const key = storageKeys.list.home.trendingNow();
  const url = `${basePath}/trending`;
  return createDefer(key, url);
};

const getTopRatedMovies = () => {
  const key = storageKeys.list.movies.topThree();
  const url = `${basePath}/topratedmovies`;
  return createDefer(key, url);
};

const getMoviesByGenre = (genreId) => {
  const key = storageKeys.list.movies.genre(genreId);
  const url = `${basePath}/moviesgenre?genre=${genreId}`;
  return createDefer(key, url);
};

const getTopRatedTv = () => {
  const key = storageKeys.list.tvShow.topThree();
  const url = `${basePath}/topratedtv`;
  return createDefer(key, url);
};

const getTvByGenre = (genreId) => {
  const key = storageKeys.list.tvShow.genre(genreId);
  const url = `${basePath}/tvgenre?genre=${genreId}`;
  return createDefer(key, url);
};

// Todo: Fix this. params: (query, page = 1)
const getSearchResults = () => {};

export {
  getMovieById,
  getTvShowById,
  getTrendingCombined,
  getTopRatedMovies,
  getMoviesByGenre,
  getTopRatedTv,
  getTvByGenre,
  getSearchResults,
};
