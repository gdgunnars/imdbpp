import React from 'react';
import styled from 'styled-components';
import {
  setTopLevelNavigator, navigate, goBack, StackNavigator,
} from './stackNavigation.service';
import TabNavigation from './tab/main.tab';

const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  background-color: #141414;
`;

const Naviagtion = () => (
  <MainContainer>
    <StackNavigator
      ref={(navigationRef) => {
        setTopLevelNavigator(navigationRef);
      }}
    />
    <TabNavigation />
  </MainContainer>
);

export { navigate, goBack, Naviagtion };
