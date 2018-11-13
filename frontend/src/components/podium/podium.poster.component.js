import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import Poster from '../poster';
import Rating from '../rating';
import { DimSize, MediaLink } from '../../common';
import { navigate } from '../../navigation';

const Container = styled.View`
  width: ${props => props.width};
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: ${DimSize.height('4%')};
`;

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  height: ${DimSize.height('6%')};
  bottom: 0;
  left: 0;
  right: 0;
`;

const RatingContainer = styled.View`
  position: relative;
  background-color: ${({ shade = 1 }) => `rgba(255, 255, 255, ${shade})`};
  padding-top: 6;
  padding-bottom: 6;
  padding-left: 8;
  display: flex;
  align-items: center;
  width: ${props => props.width};
  height: ${DimSize.height('4%')};
`;

const IconContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
`;

const PodiumPoster = ({ item, height, colors }) => {
  const link = () => navigate(MediaLink(item));
  return (
    <Container width={height * 0.7}>
      <Poster url={item.posterPath} height={height} onPress={link} />
      <Wrapper>
        <RatingContainer width={height * 0.7} shade={colors.shade}>
          <Rating score={item.score} />
        </RatingContainer>
        <IconContainer size={height * 0.15}>
          <Icon.Ionicons name="md-trophy" color={colors.icon} size={height * 0.16} />
        </IconContainer>
      </Wrapper>
    </Container>
  );
};

export default PodiumPoster;
