import React from 'react';
import { AppLoading, Font, Icon } from 'expo';
import { Navigation } from './src/navigation';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
    isLoaded: false,
  };

  loadAssetsAsync = async () => {
    const fontAssets = cacheFonts([Icon.FontAwesome.font, Icon.MaterialCommunityIcons.font]);

    await Promise.all(fontAssets);
  };

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={() => this.setState({ isLoaded: true })}
          onError={console.warn}
        />
      );
    }
    return <Navigation />;
  }
}
