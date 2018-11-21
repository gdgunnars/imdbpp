import React from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';
import { navigate } from '../stackNavigation.service';
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

const MainTab = ({ currentTabName, hidden }) => (
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

export default MainTab;
