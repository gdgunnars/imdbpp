import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import * as DimSize from '../../common/dimensionSize';

const colors = {
  white: '#fefefe',
  gray: '#B2B2B2',
  red: '#E63B3B',
};

const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const BookmarkContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BookmarkIconContainer = styled.View`
  position: absolute;
  top: 20%;
`;

const ButtonWrapper = styled.View`
  width: ${props => props.width};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${DimSize.width('2%')};
  border-width: ${DimSize.width('0.2%')};
  border-color: ${colors.red};
  background-color: ${props => (props.active ? colors.red : 'transparent')};
`;

const ButtonText = styled.Text`
  padding-top: ${DimSize.height('.8%')};
  padding-bottom: ${DimSize.height('.8%')};
  color: ${props => (props.active ? colors.white : colors.gray)};
  font-size: 12;
`;

const Buttons = {
  play: ({ size, onPress }) => (
    <Button onPress={onPress}>
      <Icon.MaterialIcons name="play-circle-outline" color={colors.white} size={size} />
    </Button>
  ),

  pause: ({ size, onPress }) => (
    <Button onPress={onPress}>
      <Icon.MaterialIcons name="play-circle-outline" color={colors.white} size={size} />
    </Button>
  ),

  camera: ({ size, onPress }) => (
    <Button onPress={onPress}>
      <Icon.MaterialIcons name="play-circle-outline" color={colors.white} size={size} />
    </Button>
  ),

  add: ({ size, onPress }) => (
    <Button onPress={onPress}>
      <BookmarkContainer>
        <Icon.FontAwesome name="bookmark" color={colors.white} size={size} />
        <BookmarkIconContainer>
          <Icon.FontAwesome name="plus" size={size / 2.5} />
        </BookmarkIconContainer>
      </BookmarkContainer>
    </Button>
  ),

  remove: ({ size, onPress }) => (
    <Button onPress={onPress}>
      <BookmarkContainer>
        <Icon.FontAwesome name="bookmark" color={colors.red} size={size} />
        <BookmarkIconContainer>
          <Icon.FontAwesome name="close" color={colors.white} size={size / 2.5} />
        </BookmarkIconContainer>
      </BookmarkContainer>
    </Button>
  ),

  markAsWatched: ({ active, onPress, size }) => (
    <Button onPress={onPress}>
      <ButtonWrapper active={active} width={size}>
        <ButtonText active={active}>{active ? 'Watched' : 'Mark as watched'}</ButtonText>
      </ButtonWrapper>
    </Button>
  ),

  addToWatchList: ({ active, onPress, size }) => (
    <Button onPress={onPress}>
      <ButtonWrapper active={active} width={size}>
        <ButtonText active={active}>{active ? 'On Watchlist' : 'Add to watch list'}</ButtonText>
      </ButtonWrapper>
    </Button>
  ),
};

export default Buttons;
