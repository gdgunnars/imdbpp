import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import SharedStyleOption from '../navigation/sharedOptions.navigation';

class TvShowScreen extends PureComponent {
  static navigationOptions = {
    title: 'Tv-Shows',
    ...SharedStyleOption,
  };

  render() {
    return <ScrollView style={{ flex: 1, backgroundColor: '#141414' }} />;
  }
}

export default TvShowScreen;
