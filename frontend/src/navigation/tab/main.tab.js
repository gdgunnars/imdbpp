import React, { Component } from 'react';
import styled from 'styled-components';
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
    activeTabName: 'Home',
  };

  componentDidMount = () => {
    this.subscription = routeChange().subscribe((newTabName) => {
      const { activeTabName } = this.state;
      if (newTabName !== activeTabName) {
        this.setState({
          activeTabName: newTabName,
        });
      }
    });
  };

  componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  render() {
    const { activeTabName } = this.state;
    return (
      <NavTabContainer>
        <NavTabItem
          onPress={navigate}
          title="Home"
          iconName="home"
          iconSet="FontAwesome"
          focused={isFocused('Home', activeTabName)}
        />
        <NavTabItem
          onPress={navigate}
          title="Movies"
          iconName="film"
          iconSet="FontAwesome"
          focused={isFocused('Movies', activeTabName)}
        />
        <NavTabItem
          onPress={navigate}
          title="Search"
          iconName="search"
          iconSet="FontAwesome"
          focused={isFocused('Search', activeTabName)}
        />
        <NavTabItem
          onPress={navigate}
          title="TvShow"
          iconName="television-classic"
          iconSet="MaterialCommunityIcons"
          focused={isFocused('TvShow', activeTabName)}
        />
        <NavTabItem
          onPress={navigate}
          title="Roulette"
          iconName="random"
          iconSet="FontAwesome"
          focused={isFocused('Roulette', activeTabName)}
        />
      </NavTabContainer>
    );
  }
}

export default MainTab;
