import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import SharedStyleOption from '../navigation/sharedStyle.navigation';

class HomeScreen extends PureComponent {
  static navigationOptions = {
    title: 'Home',
    ...SharedStyleOption,
  };

  render() {
    return <ScrollView style={{ flex: 1, backgroundColor: '#141414' }} />;
  }
}

export default HomeScreen;
