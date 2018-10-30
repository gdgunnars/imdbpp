import React, { PureComponent } from 'react';
<<<<<<< HEAD
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
=======
import ScreenContainer from './screen.style';

class RouletteScreen extends PureComponent {
  render() {
    return <ScreenContainer />;
>>>>>>> 1a655c676cd561635c19fcbded0d75cb7d51f65f
  }
}

export default RouletteScreen;
