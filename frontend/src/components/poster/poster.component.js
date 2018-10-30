import React from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';

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
`;

const defaultFunc = () => {};

const Poster = ({
  height, withCaption, url, caption, onPress = defaultFunc,
}) => {
  const containerHeight = withCaption ? height * 1.2 : height;
  return (
    <Container activeOpacity={1} height={containerHeight} onPress={onPress}>
      <PosterImage
        width={height * 0.7}
        height={height}
        source={{ uri: url }}
        resizeMode="contain"
      />
      {withCaption && <Caption>{caption}</Caption>}
    </Container>
  );
};

export default Poster;
