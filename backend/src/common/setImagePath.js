import * as config from "../config";
import * as types from "./types";

const setImagePath = data => {
  if (!data) return;

  if (types.isArray(data)) {
    return data.map(elem => setImagePath(elem));
  }
  if (types.isObject(data)) {
    return Object.keys(data).reduce(
      (prev, curr) => ({ ...prev, [curr]: setImagePath(data[curr]) }),
      {}
    );
  }
  if (
    types.isString(data) &&
    data.match(/((jpg)|(png))$/g) &&
    !data.includes("http")
  ) {
    return config.getImageLink(500, data);
  }
  return data;
};

export default setImagePath;
