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
import { Loading, NoInternet } from '../components/';

const MainContainer = styled.View`
  height: ${DimSize.height('100%')};
  background-color: #141414;
`;

class Navigation extends PureComponent {
  state = {
    isLoading: false,
    isDisconnected: false,
    tabName: '',
    hiddenTab: false,
  };

  removeSubscriptions = () => {
    this.loadSubscription.unsubscribe();
    this.onRouteChangeSubscription.unsubscribe();
  }

  componentDidMount = () => {
    this.loadSubscription = LoadingEvent.subscribe((data) => {
      const { isLoading, isDisconnected } = data;
      this.setState({
        isLoading,
        isDisconnected,
      });
    });
    this.onRouteChangeSubscription = routeChange().subscribe(({ routeName, activeTabName }) => {
      this.setState({
        tabName: activeTabName,
        hiddenTab: routeName === 'Camera',
        isDisconnected: false,
      });
    });
  };

  componentWillUnmount = () => {
    this.removeSubscriptions();
  }


  render() {
    const { isLoading, isDisconnected, hiddenTab, tabName } = this.state;
    return (
      <MainContainer>
        {isLoading && <Loading />}
        {isDisconnected && <NoInternet />}
        <StackNavigator
          ref={(navigationRef) => {
            setTopLevelNavigator(navigationRef);
          }}
        />
        <TabNavigation hidden={hiddenTab} currentTabName={tabName} />
      </MainContainer>
    );
  }
}

export {
  navigate, goBack, Navigation, routeChange,
};
