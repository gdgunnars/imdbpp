const isArray = value =>
  value && typeof value === "object" && value.constructor === Array;

const isObject = value =>
  value && typeof value === "object" && value.constructor === Object;

const isString = value => value && typeof value === "string";

const isMovie = value =>
  value && (value["type"] === "movie" || value["media_type"] === "movie" || value["release_date"]);

const isTv = value =>
  value && (value["type"] === "tv"  || value["media_type"] === "tv" || value["first_air_date"]);

const isPerson = value =>
  value && (value["type"] === "person" || value["media_type"] === "person" || value.hasOwnProperty("gender"));

export { isArray, isObject, isString, isMovie, isTv, isPerson };
