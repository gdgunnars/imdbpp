import axios from 'axios';
import { ApiGetDataError } from '../errors';

const get = async (url) => {
  try {
    const reponse = await axios(url);
    return reponse.data;
  } catch (error) {
    throw new ApiGetDataError(error);
  }
};

export default get;
