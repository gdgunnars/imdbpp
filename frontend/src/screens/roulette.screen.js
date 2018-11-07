import React, { PureComponent } from 'react';
import ScreenContainer from './screen.style';
import Spinners from '../components/spinners';

class RouletteScreen extends PureComponent {

  render() {
    return (
      <ScreenContainer>
        <Spinners spinnerType="circle" />
      </ScreenContainer>
    );
  }
}

export default RouletteScreen;
