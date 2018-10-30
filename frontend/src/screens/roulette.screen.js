import React, { PureComponent } from 'react';
import { View } from 'react-native';
import * as Style from './screen.style';
import Buttons from '../components/buttons/index';
class RouletteScreen extends PureComponent {
  static navigationOptions = {
    title: 'Roulette',
    ...Style.NavigationStyle,
  };

  test = () => {
    console.log('Its working John');
  }

  render() {
    return (
      <Style.ScreenContainer>
        <View style={{ margin: 50 }}>
          <Buttons name={'remove'} size={'55%'} onClick={this.test} />
        </View>
      </Style.ScreenContainer>
    );
  }
}

export default RouletteScreen;
