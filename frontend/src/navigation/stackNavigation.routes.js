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
  Search: {
    screen: Screen.SearchScreen,
    navigationOptions: {
      header: null,
    },
  },
  MovieTvDetail: {
    screen: Screen.MovieTvDetailScreen,
    navigationOptions: {
      ...NavigationStyle,
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
