import { NavigationActions, createStackNavigator } from 'react-navigation';
import Routes from './stackNavigation.routes';

let navigator;

const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  console.log(routeName);
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

const StackNavigator = createStackNavigator(Routes, { transitionConfig });

export {
  setTopLevelNavigator, navigate, goBack, StackNavigator,
};
