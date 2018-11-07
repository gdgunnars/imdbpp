import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import Poster from '../poster';
import Rating from '../rating';
import { MediaLink } from '../../common';
import { navigate } from '../../navigation';

const Container = styled.View`
  width: ${props => props.width};
  display: flex;
  flex-direction: column;
`;

const RatingContainer = styled.View`
  position: relative;
  background-color: ${({ shade = 1 }) => `rgba(255, 255, 255, ${shade})`};
  padding-top: 6;
  padding-bottom: 6;
  display: flex;
  align-items: center;
  width: ${props => props.width};
`;

const IconContainer = styled.View`
  position: absolute;
  top: ${props => -props.size / 2};
  left: 0;
`;

const PodiumPoster = ({ item, height, colors }) => {
  const link = () => navigate(MediaLink(item));
  return (
    <Container width={height * 0.7}>
      <Poster url={item.posterPath} height={height} onPress={link} />
      <RatingContainer width={height * 0.7} shade={colors.shade}>
        <IconContainer size={height * 0.15}>
          <Icon.Ionicons name="md-trophy" color={colors.icon} size={height * 0.15} />
        </IconContainer>
        <Rating score={item.score} />
      </RatingContainer>
    </Container>
  );
};

export default PodiumPoster;
