import axios from 'axios';
import ClientDataStorage from './clientData.storage';

const $get = url => new Promise(async (resolve, reject) => {
  try {
    const response = await axios(url);
    const { data } = response;
    if (!data) {
      resolve([]);
    }
    data.forEach((element) => {
      ClientDataStorage.storeElement(element.type, element);
    });
    resolve(data);
  } catch (error) {
    reject(error);
  }
});

export default $get;
