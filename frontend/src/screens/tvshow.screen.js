import React, { PureComponent } from 'react';
import * as Style from './screen.style';

class TvShowScreen extends PureComponent {
  static navigationOptions = {
    title: 'Tv-Shows',
    ...Style.NavigationStyle,
  };

  render() {
    return <Style.ScreenContainer />;
  }
}

export default TvShowScreen;
