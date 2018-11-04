import { createStackNavigator, StackActions } from 'react-navigation';
import { BackHandler } from 'react-native';
import Routes from './stackNavigation.routes';

let navigator;
const currentRoute = { routeName: 'Home', params: null };
const mirrorStack = [{ ...currentRoute }];

const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  const options = { routeName, params };
  mirrorStack.push(options);
  navigator.dispatch(StackActions.replace(options));
};

const goBack = () => {
  const previousRoute = mirrorStack.pop();
  if (previousRoute) {
    navigator.dispatch(StackActions.replace(previousRoute));
  } else {
    const defaultScreen = { routeName: 'Home' };
    navigator.dispatch(StackActions.replace(defaultScreen));
  }
  return true;
};

BackHandler.addEventListener('hardwareBackPress', goBack);

const FadeTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [1, 1, 1],
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
  setTopLevelNavigator, navigate, goBack, StackNavigator,
};
