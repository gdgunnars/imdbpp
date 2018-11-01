class ClientDataStorage {
  movie = {};

  tv = {};

  person = {};

  storeElement = (type, element) => {
    this[type] = { ...this[type], [element.id]: element };
  };

  getMovieById = id => ({ ...this.movie[id] });

  getTvShowById = id => ({ ...this.tv[id] });

  getPeopleById = id => ({ ...this.person[id] });
}

export default new ClientDataStorage();
