import React from 'react';
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

const MainContainer = styled.View`
  height: ${DimSize.height('100%')};
  background-color: #141414;
`;

const Navigation = () => (
  <MainContainer>
    <StackNavigator
      ref={(navigationRef) => {
        setTopLevelNavigator(navigationRef);
      }}
    />
    <TabNavigation />
  </MainContainer>
);

export {
  navigate, goBack, Navigation, routeChange,
};
