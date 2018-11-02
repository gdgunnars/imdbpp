import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import * as DimSize from '../../common/dimensionSize';

const RatingContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Score = styled.Text`
  color: #fefefe;
  font-size: ${DimSize.height('2%')};
  padding-left: 5;
`;

const getStars = (score) => {
  const IconSize = DimSize.height('2%');
  const fiveStarRating = score / 2;
  const hasDecimal = fiveStarRating % 1 !== 0;
  const flooredRating = Math.floor(fiveStarRating);
  const starColor = '#E7CF23';
  let stars = new Array(flooredRating).fill(1);

  stars = stars.map((_, index) => (
    // eslint-disable-next-line
    <Icon.FontAwesome name="star" size={IconSize} key={`${index}-star`} color={starColor} />
  ));
  if (hasDecimal) {
    stars.push(
      <Icon.FontAwesome name="star-half" size={IconSize} key="half-star" color={starColor} />,
    );
  }
  return stars;
};

const Rating = ({ score }) => (
  <RatingContainer>
    {getStars(score)}
    {score && <Score>{score}</Score>}
  </RatingContainer>
);

export default Rating;
