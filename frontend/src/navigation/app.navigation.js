import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './tab.navigation';

export default createSwitchNavigator({
  Main: MainTabNavigator,
});
