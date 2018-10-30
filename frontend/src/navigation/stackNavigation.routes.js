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
      header: null,
    },
  },
  Movies: {
    screen: Screen.MovieScreen,
    navigationOptions: {
      title: 'Movies',
      ...NavigationStyle,
    },
  },
  Search: {
    screen: Screen.SearchScreen,
    navigationOptions: {
      title: 'Search',
      ...NavigationStyle,
    },
  },
  TvShow: {
    screen: Screen.TvShowScreen,
    navigationOptions: {
      title: 'Tv-Show',
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
};

export default Routes;
