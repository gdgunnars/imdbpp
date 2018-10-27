import React, { PureComponent } from 'react';
import * as Style from './screen.style';

class MovieScreen extends PureComponent {
  static navigationOptions = {
    title: 'Movies',
    ...Style.NavigationStyle,
  };

  render() {
    return <Style.ScreenContainer />;
  }
}

export default MovieScreen;
