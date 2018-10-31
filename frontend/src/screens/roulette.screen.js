import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Buttons from '../components/buttons/index';
import ScreenContainer from './screen.style';

class RouletteScreen extends PureComponent {
  test = () => {
    console.log('Its working John');
  }
  render() {
    return <ScreenContainer >
      <View style={{ margin: 50 }}>
        <Buttons name={'remove'} size={'55%'} onClick={this.test} />
      </View>
    </ScreenContainer>;

  }
}

export default RouletteScreen;
