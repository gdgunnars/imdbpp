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

const Routes = {
  Home: {
    screen: Screen.HomeScreen,
    navigationOptions: {
      ...NavigationStyle,
    },
  },
  WatchList: {
    screen: Screen.WatchLaterScreen,
    navigationOptions: {
      title: 'My WatchList',
      ...NavigationStyle,
      headerStyle: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: '#141414',
        elevation: 0,
      },
      headerTransparent: false,
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
      ...NavigationStyle,
      headerStyle: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: '#141414',
        elevation: 0,
      },
      headerTransparent: false,
    },
  },

  TvShow: {
    screen: Screen.TvShowScreen,
    navigationOptions: {
      title: 'Top Tv-Shows',
      ...NavigationStyle,
      headerStyle: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: '#141414',
        elevation: 0,
      },
      headerTransparent: false,
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
  Camera: {
    screen: Screen.CameraScreen,
    navigationOptions: {
      ...NavigationStyle,
    },
  },
};

export default Routes;
