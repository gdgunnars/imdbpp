import axios from 'axios';
import { ApiGetDataError } from '../errors';

const get = async (url) => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (error) {
    throw new ApiGetDataError(error);
  }
};

export default get;
