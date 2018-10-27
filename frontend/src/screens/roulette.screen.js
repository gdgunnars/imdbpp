import React, { PureComponent } from 'react';
import * as Style from './screen.style';

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
