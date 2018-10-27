import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import NavigationIcon from './icon.navigation';
import Screens from '../screens';

const HomeStack = createStackNavigator({
  Home: Screens.HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <NavigationIcon iconSet="FontAwesome" focused={focused} name="home" />
  ),
};

const MovieStack = createStackNavigator({
  Movie: Screens.MovieScreen,
});

MovieStack.navigationOptions = {
  tabBarLabel: 'Movies',
  tabBarIcon: ({ focused }) => (
    <NavigationIcon iconSet="FontAwesome" focused={focused} name="film" />
  ),
};

const SearchStack = createStackNavigator({
  Search: Screens.SearchScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <NavigationIcon iconSet="FontAwesome" focused={focused} name="search" />
  ),
};

const TvShowStack = createStackNavigator({
  TvShow: Screens.TvShowScreen,
});

TvShowStack.navigationOptions = {
  tabBarLabel: 'Tv-Shows',
  tabBarIcon: ({ focused }) => (
    <NavigationIcon iconSet="MaterialCommunityIcons" focused={focused} name="television-classic" />
  ),
};

const RouletteStack = createStackNavigator({
  Roulette: Screens.RouletteScreen,
});

RouletteStack.navigationOptions = {
  tabBarLabel: 'Roulette',
  tabBarIcon: ({ focused }) => (
    <NavigationIcon iconSet="FontAwesome" focused={focused} name="random" />
  ),
};

export default createBottomTabNavigator(
  {
    HomeStack,
    MovieStack,
    SearchStack,
    TvShowStack,
    RouletteStack,
  },
  {
    tabBarOptions: {
      style: {
        borderWidth: 0,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#252526',
      },
      activeBackgroundColor: '#252526',
      inactiveBackgroundColor: '#252526',
      activeTintColor: '#fefefe',
      inactiveTintColor: 'rgba(255,255,255, 0.48)',
    },
  },
);
