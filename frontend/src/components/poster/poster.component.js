import React from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';

import missingposter from '../../../assets/images/missingposter.jpg';

const PosterImage = styled.Image`
  height: ${props => props.height};
  width: ${props => props.width};
`;

const Container = styled.TouchableOpacity`
  height: ${props => props.height};
`;

const Caption = styled.Text`
  font-size: ${DimSize.height('2%')};
  color: #fefefe;
  padding-top: ${DimSize.height('1%')};
  text-align: center;
`;

const defaultFunc = () => { };

const Poster = ({
  height, url, caption, onPress = defaultFunc,
}) => {
  const containerHeight = caption ? height * 1.2 : height;

  return (
    <Container activeOpacity={1} height={containerHeight} onPress={onPress}>
      {
        url &&
        <PosterImage
          width={height * 0.7}
          height={height}
          source={{ uri: url }}
          resizeMode="contain"
        />
      }
      {
        !url &&
        <PosterImage
          width={height * 0.7}
          height={height}
          source={missingposter}
          resizeMode="contain"
        />
      }
      {caption && <Caption>{caption}</Caption>}
    </Container>
  );
};

export default Poster;
