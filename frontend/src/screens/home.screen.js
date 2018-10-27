import React, { PureComponent } from 'react';
import * as Style from './screen.style';

// Todo replace this for parent container
import Backdrop from '../components/backdrop.component';
import Slider from '../components/Slider';

class HomeScreen extends PureComponent {
  static navigationOptions = {
    title: 'Home',
    ...Style.NavigationStyle
  };

  render() {
    return (
      <Style.ScreenContainer>
        <Backdrop />
        <Slider
          items={[
            { key: '1' },
            { key: '2' },
            { key: '3' },
            { key: '4' },
            { key: '5' },
            { key: '6' },
            { key: '7' },
            { key: '8' },
            { key: '9' },
            { key: '10' }
          ]}
        />
      </Style.ScreenContainer>
    );
  }
}

export default HomeScreen;
