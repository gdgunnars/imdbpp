import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import SharedStyleOption from '../navigation/sharedOptions.navigation';

class MovieScreen extends PureComponent {
  static navigationOptions = {
    title: 'Movies',
    ...SharedStyleOption,
  };

  render() {
    return <ScrollView style={{ flex: 1, backgroundColor: '#141414' }} />;
  }
}

export default MovieScreen;
