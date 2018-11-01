import * as types from "./types";
import { Tv, Movie, Person } from "../Models";

const mediaNormalizer = data => {
  if (types.isArray(data)) {
    return data.map(elem => mediaNormalizer(elem));
  }

  if (types.isObject(data)) {
    if (types.isMovie(data)) {
      return Movie(data);
    }

    if (types.isTv(data)) {
      return Tv(data);
    }

    if (types.isPerson(data)) {
      return Person(data);
    }
    return data;
  }

  return data;
};

export default mediaNormalizer;
