const storageKeys = {
  movie: id => `movie_${id}`,
  tv: id => `movie_${id}`,
  recentSearches: () => 'recentSearches',
  watchList: () => 'watchList',
  sessionToken: () => 'sessionToken',
  list: {
    home: {
      trendingNow: () => 'list_home_trendingNow',
    },
    movies: {
      topThree: () => 'list_movies_topThree',
      actionGenre: () => 'list_movies_actionGenre',
      comedyGenre: () => 'list_movies_comedyGenre',
      fantasyGenre: () => 'list_movies_fantasyGenre',
    },
    tvShow: {
      topThree: () => 'list_tvShow_topThree',
      dramaGenre: () => 'list_tvShow_dramaGenre',
      comedyGenre: () => 'list_tvShow_comedyGenre',
      animationGenre: () => 'list_tvShow_animationGenre',
    },
  },
};

export default storageKeys;
