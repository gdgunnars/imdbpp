import { createStackNavigator, StackActions } from 'react-navigation';
import { BackHandler } from 'react-native';
import { defer, BehaviorSubject } from 'rxjs';
import Routes from './stackNavigation.routes';

let navigator;
const defaultRoute = { routeName: 'Home', params: null, activeTabName: 'Home' };
const currentRouteObject = { ...defaultRoute };
const routingSubject = new BehaviorSubject(defaultRoute.routeName);
const mirrorStack = [{ ...defaultRoute }];
const mainRoutes = {
  Home: 'Home',
  Movies: 'Movies',
  Search: 'Search',
  TvShow: 'TvShow',
  WatchList: 'WatchList',
};

const oneOfMainRoutes = routeName => mainRoutes[routeName];

const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

const routeChange = () => defer(() => routingSubject.asObservable());

const navigate = (
  { routeName, params },
  activeTabName = oneOfMainRoutes(routeName) ? routeName : currentRouteObject.currentTabName,
) => {
  if (
    currentRouteObject.currentTabName === activeTabName
    && (activeTabName === 'Search' && params === currentRouteObject.params)
  ) {
    console.log('im just here again...');
    routingSubject.next(currentRouteObject.currentTabName);
    return;
  }
  currentRouteObject.currentTabName = activeTabName;
  currentRouteObject.routeName = routeName;
  currentRouteObject.params = params;
  const options = { routeName, params, activeTabName };
  mirrorStack.push(options);
  routingSubject.next(currentRouteObject.currentTabName);
  navigator.dispatch(StackActions.replace(options));
};

const goBack = () => {
  mirrorStack.pop();
  const previousRoute = mirrorStack.pop();
  if (previousRoute) {
    navigate(
      { routeName: previousRoute.routeName, params: previousRoute.params },
      previousRoute.activeTabName,
    );
  } else {
    const defaultScreen = 'Home';
    navigate(defaultScreen);
  }
  return true;
};

BackHandler.addEventListener('hardwareBackPress', goBack);

const FadeTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  return {
    opacity,
  };
};

const transitionConfig = () => ({
  screenInterpolator: (sceneProps) => {
    const { position, scene } = sceneProps;
    const { index } = scene;
    return FadeTransition(index, position);
  },
});

const StackNavigator = createStackNavigator(Routes, {
  transitionConfig,
  headerLayoutPreset: 'center',
});

export {
  setTopLevelNavigator, navigate, goBack, StackNavigator, routeChange,
};
