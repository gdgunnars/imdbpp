const storageKeys = {
  movie: id => `movie_${id}`,
  tv: id => `movie_${id}`,
  person: id => `person_${id}`,
  recentSearches: () => 'recentSearches',
  watchList: () => 'watchList',
  sessionToken: () => 'sessionToken',
  list: {
    home: {
      trendingNow: () => 'list_home_trendingNow',
      discover: () => 'list_home_discover',
    },
    movies: {
      topThree: () => 'list_movies_topThree',
      genre: genreId => `list_movies_genre_${genreId}`,
    },
    tvShow: {
      topThree: () => 'list_tvShow_topThree',
      genre: genreId => `list_tvShow_genre_${genreId}`,
    },
  },
};

export default storageKeys;
