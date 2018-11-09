import React, { Component } from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import * as DimSize from '../../common/dimensionSize';
import { navigate, routeChange } from '../stackNavigation.service';
import NavTabItem from './item.tab';
import Theme from '../../common/theme';

const NavTabContainer = styled.View`
  width: ${DimSize.width('100%')};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: #252526;
  height: ${Theme.sizes.tabBar.height};
`;

const isFocused = (name, selected) => name === selected;

class MainTab extends Component {
  state = {
    currentTabName: 'Home',
    hidden: false,
  };

  componentDidMount = () => {
    this.subscription = routeChange().subscribe(({ routeName, activeTabName }) => {
      this.setState({
        currentTabName: activeTabName,
        hidden: routeName === 'Camera',
      });
    });
  };

  componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  render() {
    const { currentTabName, hidden } = this.state;
    return (
      <NavTabContainer style={{ display: hidden ? 'none' : 'flex' }}>
        <NavTabItem
          onPress={navigate}
          title="Home"
          iconName="home"
          iconSet="FontAwesome"
          focused={isFocused('Home', currentTabName)}
        />
        <NavTabItem
          onPress={navigate}
          title="Movies"
          iconName="film"
          iconSet="FontAwesome"
          focused={isFocused('Movies', currentTabName)}
        />
        <NavTabItem
          onPress={navigate}
          title="Search"
          iconName="search"
          iconSet="FontAwesome"
          focused={isFocused('Search', currentTabName)}
        />
        <NavTabItem
          onPress={navigate}
          title="TvShow"
          iconName="television-classic"
          iconSet="MaterialCommunityIcons"
          focused={isFocused('TvShow', currentTabName)}
        />
        <NavTabItem
          onPress={navigate}
          title="WatchList"
          iconName="restore"
          iconSet="MaterialCommunityIcons"
          focused={isFocused('WatchList', currentTabName)}
        />
      </NavTabContainer>
    );
  }
}

export default MainTab;
