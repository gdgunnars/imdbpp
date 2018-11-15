import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
  setTopLevelNavigator,
  navigate,
  goBack,
  StackNavigator,
  routeChange,
} from './stackNavigation.service';
import TabNavigation from './tab/main.tab';
import * as DimSize from '../common/dimensionSize';
import { LoadingEvent } from '../services/loading.service';
import LoadingScreen from '../components/loading';

const MainContainer = styled.View`
  height: ${DimSize.height('100%')};
  background-color: #141414;
`;

class Navigation extends PureComponent {
  state = {
    isLoading: false,
  };

  componentDidMount = () => {
    this.subscription = LoadingEvent.subscribe((data) => {
      this.setState({
        isLoading: data,
      });
    });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <MainContainer>
        {isLoading && <LoadingScreen />}
        <StackNavigator
          ref={(navigationRef) => {
            setTopLevelNavigator(navigationRef);
          }}
        />
        <TabNavigation />
      </MainContainer>
    );
  }
}

export {
  navigate, goBack, Navigation, routeChange,
};
