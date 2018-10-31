import * as config from "../config";
const isArray = value =>
  value && typeof value === "object" && value.constructor === Array;

const isObject = value =>
  value && typeof value === "object" && value.constructor === Object;

const isString = value => value && typeof value === "string";

const setImagePath = data => {
  if (isArray(data)) {
    return data.map(elem => setImagePath(elem));
  }
  if (isObject(data)) {
    return Object.keys(data).reduce(
      (prev, curr) => ({ ...prev, [curr]: setImagePath(data[curr]) }),
      {}
    );
  }
  if (isString(data) && data.match(/((jpg)|(png))$/g)) {
    return config.getImageLink(500, data);
  }
  return data;
};

export default setImagePath;
