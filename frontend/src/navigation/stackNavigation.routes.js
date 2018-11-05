import Screen from '../screens';
import { getTrendingCombined } from '../services';
import * as DimSize from '../common/dimensionSize';

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
      header: null,
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
  MovieDetail: {
    screen: Screen.MovieDetailScreen,
    navigationOptions: {
      ...NavigationStyle,
    },
  },
  TvShowDetail: {
    screen: Screen.TvShowDetailScreen,
    navigationOptions: {
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
