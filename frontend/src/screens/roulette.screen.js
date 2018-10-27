import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import SharedStyleOption from '../navigation/sharedOptions.navigation';

class RouletteScreen extends PureComponent {
  static navigationOptions = {
    title: 'Roulette',
    ...SharedStyleOption,
  };

  render() {
    return <ScrollView style={{ flex: 1, backgroundColor: '#141414' }} />;
  }
}

export default RouletteScreen;
