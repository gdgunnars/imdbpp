import { AsyncStorage } from 'react-native';
import * as customErrors from '../errors';

const toJson = data => new Promise((resolve, reject) => {
  try {
    const stringifiedData = JSON.stringify(data);
    resolve(stringifiedData);
  } catch (error) {
    reject(new customErrors.ToJsonError());
  }
});

const parseJson = data => new Promise((resolve, reject) => {
  try {
    const parsedData = JSON.parse(data);
    resolve(parsedData);
  } catch (error) {
    reject(new customErrors.ParseJsonError());
  }
});

const storeData = (key, data) => new Promise(async (resolve, reject) => {
  try {
    // Todo: Now we just assume that we need to cast all data to json.
    const jsonData = await toJson(data);
    await AsyncStorage.setItem(key, jsonData);
    return resolve(true);
  } catch (error) {
    return reject(new customErrors.StoreDataError());
  }
});

const retrieveData = key => new Promise(async (resolve, reject) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) {
      return reject(new customErrors.StorageDataWithKeyNotFound());
    }
    const parsedData = await parseJson(data);
    return resolve(parsedData);
  } catch (error) {
    return reject(new customErrors.RetrieveStorageDataError());
  }
});

const clearSessionData = () => new Promise(async (resolve, reject) => {
  try {
    await AsyncStorage.clear();
    return resolve(true);
  } catch (error) {
    return reject(new customErrors.StorageClearAllSessionData());
  }
});

export { storeData, retrieveData, clearSessionData };
