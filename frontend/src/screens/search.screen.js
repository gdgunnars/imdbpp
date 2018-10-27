import React, { PureComponent } from 'react';
import * as Style from './screen.style';

class SearchScreen extends PureComponent {
  static navigationOptions = {
    title: 'Search',
    ...Style.NavigationStyle,
  };

  render() {
    return <Style.ScreenContainer />;
  }
}

export default SearchScreen;
