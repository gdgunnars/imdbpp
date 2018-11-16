import { createStackNavigator, StackActions } from 'react-navigation';
import { BackHandler } from 'react-native';
import { defer, BehaviorSubject } from 'rxjs';
import Routes from './stackNavigation.routes';

let navigator;
const defaultRoute = { routeName: 'Home', params: null, activeTabName: 'Home' };
let currentRouteObject = { ...defaultRoute };
const routingSubject = new BehaviorSubject({ ...defaultRoute });
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
  activeTabName = oneOfMainRoutes(routeName) ? routeName : currentRouteObject.activeTabName,
) => {
  if (
    currentRouteObject.routeName === routeName
    && (routeName === 'Search' && params === currentRouteObject.params)
  ) {
    routingSubject.next(currentRouteObject.activeTabName);
    return;
  }
  currentRouteObject = { routeName, activeTabName, params };
  const options = { routeName, params, activeTabName };
  mirrorStack.push(options);
  routingSubject.next(options);
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
    navigate(defaultRoute);
  }
  return true;
};

BackHandler.addEventListener('hardwareBackPress', goBack);

const StackNavigator = createStackNavigator(Routes, {
  headerLayoutPreset: 'center',
});

export {
  setTopLevelNavigator, navigate, goBack, StackNavigator, routeChange,
};
