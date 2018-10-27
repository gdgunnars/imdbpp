import React, { PureComponent } from 'react';
import * as Style from './screen.style';

// Todo replace this for parent container
import Backdrop from '../components/backdrop';

class HomeScreen extends PureComponent {
  static navigationOptions = {
    title: 'Home',
    ...Style.NavigationStyle,
  };

  render() {
    return (
      <Style.ScreenContainer>
        <Backdrop />
      </Style.ScreenContainer>
    );
  }
}

export default HomeScreen;
