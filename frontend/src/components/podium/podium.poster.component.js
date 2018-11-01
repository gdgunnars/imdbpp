import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import Poster from '../poster';
import Rating from '../rating';
import typeToRoutePath from '../../common/typeToRoute';
import { navigate } from '../../navigation';

const Container = styled.View`
  width: ${props => props.width};
  display: flex;
  flex-direction: column;
`;

const RatingContainer = styled.View`
  position: relative;
  background-color: rgba(255, 255, 255, ${props => props.shade});
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

const PodiumPoster = ({ item, height, colors }) => (
  <Container width={height * 0.7}>
    <Poster
      url={item.posterPath}
      height={height}
      onPress={() => navigate(typeToRoutePath(item.type), { id: item.id })}
    />
    <RatingContainer width={height * 0.7} shade={colors.shade}>
      <IconContainer size={height * 0.15}>
        <Icon.Ionicons
          name="md-trophy"
          color={colors.icon}
          size={height * 0.15}
        />
      </IconContainer>
      <Rating score={item.score} />
    </RatingContainer>
  </Container>
);

export default PodiumPoster;
