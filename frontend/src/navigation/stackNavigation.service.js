import { NavigationActions, createStackNavigator } from 'react-navigation';
import Routes from './stackNavigation.routes';

let navigator;

const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

const goBack = () => {
  navigator.dispatch(NavigationActions.back());
};

const StackNavigator = createStackNavigator(Routes);

export {
  setTopLevelNavigator, navigate, goBack, StackNavigator,
};
