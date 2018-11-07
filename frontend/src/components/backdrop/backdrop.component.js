import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ImageBackdrop from './image.backdrop.component';
import Poster from '../poster';
import Rating from '../rating';
import { DimSize, DateFormat, Theme } from '../../common';
import { Text, View } from '../../general';

const Container = styled.TouchableOpacity`
  position: relative;
  height: ${props => props.height};
  width: ${props => props.width};
  flex-direction: column;
  z-index: 999;
`;

const RatingContainer = styled.View`
  position: absolute;
  top: ${Theme.sizes.spaces.content.small.top + Theme.sizes.statusBar.height};
  right: ${Theme.sizes.spaces.window.right};
`;

const ImageBackdropHeight = DimSize.height('38%');
const ContainerHeight = DimSize.height('44%');
const ContainerWidth = DimSize.width('100%');
const posterHeight = DimSize.height('20%');

/* eslint-disable */
class Backdrop extends PureComponent {
  render() {
    const { name, score, date, backdropPath, posterPath, overview, onPress } = this.props;
    return (
      <Container
        activeOpacity={1}
        height={ContainerHeight}
        width={ContainerWidth}
        onPress={onPress}
        pointerEvents="box-only"
      >
        <ImageBackdrop height={ImageBackdropHeight} url={backdropPath} />
        <RatingContainer>{score > 0 && <Rating score={score} />}</RatingContainer>
        <View.rowPadding stretch alignItems="flex-end">
          <Poster height={posterHeight} url={posterPath} />
          <View.columnPadding stretch justifyContent="space-between">
            <View.basic>
              <Text.title>
                {name}
                <Text.title color={'default'}>{` (${DateFormat(date)})`}</Text.title>
              </Text.title>
            </View.basic>
            <View.basic>
              <Text.caption>{overview}</Text.caption>
            </View.basic>
          </View.columnPadding>
        </View.rowPadding>
      </Container>
    );
  }
}

export default Backdrop;
