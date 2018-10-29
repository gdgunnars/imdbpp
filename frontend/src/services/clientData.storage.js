class ClientDataStorage {
  movie = {};

  tv = {};

  people = {};

  storeElement = (type, element) => {
    this[type] = { ...this[type], [element.id]: element };
  };

  getMovieById = id => ({ ...this.movies[id] });

  getTvShowById = id => ({ ...this.tvShows[id] });

  getPeopleById = id => ({ ...this.people[id] });
}

export default new ClientDataStorage();
