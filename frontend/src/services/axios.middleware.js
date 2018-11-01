import axios from 'axios';
import ClientDataStorage from './clientData.storage';

const isArray = value => value && typeof value === 'object' && value.constructor === Array;

const isObject = value => value && typeof value === 'object' && value.constructor === Object;

const addToClientStorage = (data) => {
  if (isArray(data)) {
    data.forEach(item => addToClientStorage(item));
  }
  if (isObject(data)) {
    if (data.type && data.id) {
      ClientDataStorage.storeElement(data.type, data);
    }
    Object.keys(data).forEach(item => addToClientStorage(data[item]));
  }
};

const $get = url => new Promise(async (resolve, reject) => {
  try {
    const response = await axios(url);
    const { data } = response;
    if (!data) {
      resolve([]);
    }
    addToClientStorage(data);
    resolve(data);
  } catch (error) {
    reject(error);
  }
});

export default $get;
