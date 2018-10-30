class ClientDataStorage {
  movie = {};

  tv = {};

  people = {};

  storeElement = (type, element) => {
    this[type] = { ...this[type], [element.id]: element };
  };

  getMovieById = id => ({ ...this.movie[id] });

  getTvShowById = id => ({ ...this.tv[id] });

  getPeopleById = id => ({ ...this.people[id] });
}

export default new ClientDataStorage();
