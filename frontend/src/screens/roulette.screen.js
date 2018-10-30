import React, { PureComponent } from 'react';
import * as Style from './screen.style';
import Buttons from '../components/buttons/index';

class RouletteScreen extends PureComponent {
  static navigationOptions = {
    title: 'Roulette',
    ...Style.NavigationStyle,
  };

  render() {
    return <Style.ScreenContainer />;
  }
}

export default RouletteScreen;
