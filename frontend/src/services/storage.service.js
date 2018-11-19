import { defer, Observable } from 'rxjs';
import basePath from './service.config';
import { errorCodes } from '../errors';
import { showLoadingScreen, hideLoadingScreen } from './loading.service';
import {
  storeData, retrieveData, storageKeys, clearSessionData,
} from '../storage';
import * as $ from './api.service';

/* eslint-disable */
const createDefer = (key, url, populateWatchList) =>
  defer(() =>
    Observable.create(async observer => {
      try {
        // Todo: Remove clearSessionData.
        // Uncomment nextLine to clearAllData from LocalDB.
        // await clearSessionData();
        const storageData = await retrieveData(key);
        if (populateWatchList) {
          retrieveData(storageKeys.watchList())
            .then(watchList => {
              observer.next({ ...storageData, onWatchList: watchList[key] });
            })
            .catch(() => {
              observer.next(storageData);
            });
        } else {
          observer.next(storageData);
          return observer.complete();
        }
      } catch (error) {
        if (error.code === errorCodes.ClientDataStorage.keyNotFound) {
          showLoadingScreen();
          const apiData = await $.get(url);
          observer.next(apiData);
          hideLoadingScreen();
          await storeData(key, apiData);
          return observer.complete();
        }
      }
      return () => `Defer with the key:${key} and url: ${url} was completed`;
    }),
  );

const getMovieById = id => {
  const key = storageKeys.movie(id);
  const url = `${basePath}/movie/${id}`;
  return createDefer(key, url, true);
};

const getTvShowById = id => {
  const key = storageKeys.tv(id);
  const url = `${basePath}/tvshow/${id}`;
  return createDefer(key, url, true);
};

const getPersonById = id => {
  const key = storageKeys.person(id);
  const url = `${basePath}/person/${id}`;
  return createDefer(key, url, true);
};

const getTrendingCombined = () => {
  const key = storageKeys.list.home.trendingNow();
  const url = `${basePath}/trending`;
  return createDefer(key, url);
};

const getDiscover = () => {
  const key = storageKeys.list.home.discover();
  const url = `${basePath}/discover`;
  return createDefer(key, url);
};

const getTopRatedMovies = () => {
  const key = storageKeys.list.movies.topThree();
  const url = `${basePath}/topratedmovies`;
  return createDefer(key, url);
};

const getMoviesByGenre = genreId => {
  const key = storageKeys.list.movies.genre(genreId);
  const url = `${basePath}/moviesgenre?genre=${genreId}`;
  return createDefer(key, url);
};

const getTopRatedTv = () => {
  const key = storageKeys.list.tvShow.topThree();
  const url = `${basePath}/topratedtv`;
  return createDefer(key, url);
};

const getTvByGenre = genreId => {
  const key = storageKeys.list.tvShow.genre(genreId);
  const url = `${basePath}/tvgenre?genre=${genreId}`;
  return createDefer(key, url);
};

const addItemToRecentSearches = item =>
  new Promise(async (resolve, reject) => {
    const key = storageKeys.recentSearches();
    try {
      const recentSearches = await retrieveData(key);
      const isAlreadyInList = recentSearches.find(elem => elem.id === item.id);
      if (isAlreadyInList) {
        return resolve(true);
      }
      await storeData(key, [item, ...recentSearches]);
      return resolve(true);
    } catch (error) {
      if (error.code === errorCodes.ClientDataStorage.keyNotFound) {
        const newSearches = [item];
        await storeData(key, newSearches);
        return resolve(true);
      }
      return reject(error);
    }
  });

const getRecentSearches = () =>
  defer(() =>
    Observable.create(async observer => {
      const key = storageKeys.recentSearches();
      try {
        const storageData = await retrieveData(key);
        observer.next(storageData);
        observer.complete();
      } catch (error) {
        if (error.code === errorCodes.ClientDataStorage.keyNotFound) {
          observer.next([]);
          observer.complete();
        }
      }
      return () => `Defer with the key:${key} was completed`;
    }),
  );

const removeItemFromRecentSearches = async id => {
  const key = storageKeys.recentSearches();
  try {
    const storageData = await retrieveData(key);
    const filteredData = storageData.filter(item => item.id !== +id);
    await storeData(key, filteredData);
    return id;
  } catch (error) {
    return null;
  }
};

const getSearchResults = (query, page = 1) =>
  new Promise(resolve => {
    $.get(`${basePath}/search?query=${query}&page=${page}`)
      .then(data => resolve(data))
      .catch(() => resolve(null));
  });

const getVisionResults = query =>
  new Promise(resolve => {
    $get(`${basePath}/vision?query=${query}`)
      .then(data => resolve(data))
      .catch(() => resolve(null));
  });

const toggleItemToWatchList = item =>
  defer(() =>
    Observable.create(async observer => {
      const itemKey = storageKeys[item.type](item.id);
      const watchListKey = storageKeys.watchList();
      try {
        const watchList = await retrieveData(watchListKey);
        const onWatchList = watchList[itemKey];
        if (onWatchList) {
          delete watchList[itemKey];
          await storeData(watchListKey, watchList);
          observer.next({ ...item, onWatchList: false });
        } else {
          await storeData(watchListKey, { ...watchList, [itemKey]: new Date().getDate() });
          observer.next({ ...item, onWatchList: true });
        }
        observer.complete();
      } catch (error) {
        if (error.code === errorCodes.ClientDataStorage.keyNotFound) {
          await storeData(watchListKey, { [itemKey]: true });
          observer.next({ ...item, onWatchList: true });
          observer.complete();
        }
      }
    }),
  );

const getWatchList = () =>
  defer(() =>
    Observable.create(async observer => {
      const key = storageKeys.watchList();
      try {
        const storageData = await retrieveData(key);
        const promisedAllData = Object.keys(storageData)
          .sort((a, b) => (storageData[a] < storageData[b] ? 1 : -1))
          .map(watchListItemKey => retrieveData(watchListItemKey));
        const watchList = await Promise.all(promisedAllData);
        observer.next(watchList);
        observer.complete();
      } catch (error) {
        if (error.code === errorCodes.ClientDataStorage.keyNotFound) {
          observer.next([]);
          observer.complete();
        }
        console.log('Error getting watch list:',error);
      }
      return () => `Defer with the key:${key} was completed`;
    }),
  );

const getVisionSearchData = image =>
  new Promise(resolve => {
    $.post(`${basePath}/vision`, { image })
      .then(data => resolve(data))
      .catch(() => resolve(null));
  });

export {
  getMovieById,
  getTvShowById,
  getTrendingCombined,
  getTopRatedMovies,
  getMoviesByGenre,
  getTopRatedTv,
  getTvByGenre,
  getSearchResults,
  addItemToRecentSearches,
  getRecentSearches,
  removeItemFromRecentSearches,
  getVisionResults,
  getWatchList,
  toggleItemToWatchList,
  getVisionSearchData,
  getPersonById,
  getDiscover,
};
