import React, { Component } from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';
import { navigate } from '../index';
import NavTabItem from './item.tab';

const NavTabContainer = styled.View`
  width: ${DimSize.width('100%')};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: #252526;
`;

const isFocused = (name, selected) => name === selected;

class MainTab extends Component {
  state = {
    activeTabName: 'Home',
  };

  onItemClick = (name) => {
    const { activeTabName } = this.state;
    if (activeTabName !== name) {
      this.setState({
        activeTabName: name,
      });
    }
    navigate(name);
  };

  render() {
    const { activeTabName } = this.state;
    return (
      <NavTabContainer>
        <NavTabItem
          onPress={this.onItemClick}
          title="Home"
          iconName="home"
          iconSet="FontAwesome"
          focused={isFocused('Home', activeTabName)}
        />
        <NavTabItem
          onPress={this.onItemClick}
          title="Movies"
          iconName="film"
          iconSet="FontAwesome"
          focused={isFocused('Movies', activeTabName)}
        />
        <NavTabItem
          onPress={this.onItemClick}
          title="Search"
          iconName="search"
          iconSet="FontAwesome"
          focused={isFocused('Search', activeTabName)}
        />
        <NavTabItem
          onPress={this.onItemClick}
          title="TvShow"
          iconName="television-classic"
          iconSet="MaterialCommunityIcons"
          focused={isFocused('TvShow', activeTabName)}
        />
        <NavTabItem
          onPress={this.onItemClick}
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
