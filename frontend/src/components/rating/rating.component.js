import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { Text } from '../../general';
import { Theme } from '../../common';

const RatingContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const getStars = (score) => {
  if (!score) {
    return <Text.caption />;
  }
  const fiveStarRating = score / 2;
  const hasDecimal = fiveStarRating % 1 !== 0;
  const flooredRating = Math.floor(fiveStarRating);
  let stars = new Array(flooredRating).fill(1);
  stars = stars.map((item, index) => `star_${index}`);

  stars = stars.map(item => (
    <Icon.FontAwesome
      name="star"
      size={Theme.sizes.text.small}
      key={item}
      color={Theme.colors.text.star}
    />
  ));
  if (hasDecimal) {
    stars.push(
      <Icon.FontAwesome
        name="star-half"
        size={Theme.sizes.text.small}
        key="half-star"
        color={Theme.colors.text.star}
      />,
    );
  }
  return stars;
};

const textStyle = {
  paddingLeft: Theme.sizes.spaces.content.small.left,
};

const Rating = ({ score }) => (
  <RatingContainer>
    {getStars(score)}
    {score && (
      <Text.caption color="light" style={textStyle}>
        {score}
      </Text.caption>
    )}
  </RatingContainer>
);

export default Rating;
