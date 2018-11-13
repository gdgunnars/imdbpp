import Screen from '../screens';

const NavigationStyle = {
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
    color: '#fefefe',
    fontWeight: 'normal',
    fontSize: 16,
  },
  headerStyle: {
    elevation: 0,
  },
  headerTransparent: true,
  headerTintColor: '#fefefe',
};

const withNav = {
  headerTitleStyle: {
    ...NavigationStyle.headerTitleStyle,
  },
  headerStyle: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    backgroundColor: '#313131',
    elevation: 0,
  },
  headerTransparent: false,
  headerTintColor: '#fefefe',
};

const Routes = {
  Home: {
    screen: Screen.HomeScreen,
    navigationOptions: {
      ...NavigationStyle,
    },
  },

  Camera: {
    screen: Screen.CameraScreen,
    navigationOptions: {
      ...NavigationStyle,
    },
  },
  WatchList: {
    screen: Screen.WatchLaterScreen,
    navigationOptions: {
      title: 'My WatchList',
      ...withNav,
    },
  },

  Search: {
    screen: Screen.SearchScreen,
    navigationOptions: {
      header: null,
    },
  },

  Movies: {
    screen: Screen.MovieScreen,
    navigationOptions: {
      title: 'Top Movies',
      ...withNav,
    },
  },

  TvShow: {
    screen: Screen.TvShowScreen,
    navigationOptions: {
      title: 'Top Tv-Shows',
      ...withNav,
    },
  },
  MovieTvDetail: {
    screen: Screen.MovieTvDetailScreen,
    navigationOptions: {
      ...NavigationStyle,
    },
  },

  Roulette: {
    screen: Screen.RouletteScreen,
    navigationOptions: {
      title: 'Roulette',
      ...NavigationStyle,
    },
  },
  PersonDetail: {
    screen: Screen.PersonDetailScreen,
    navigationOptions: {
      ...NavigationStyle,
    },
  },
};

export default Routes;
