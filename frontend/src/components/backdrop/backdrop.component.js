import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ImageBackdrop from './image.backdrop.component';
import Poster from '../poster';
import Rating from '../rating';
import * as DimSize from '../../common/dimensionSize';
import dateFormat from '../../common/dateFormat';

const Container = styled.View`
  position: relative;
  height: ${props => props.height};
  width: ${props => props.width};
  flex-direction: column;
`;

const ContentContainer = styled.View`
  bottom: 0;
  padding-left: ${DimSize.windowSidesPadding()};
  padding-right: ${DimSize.windowSidesPadding()};
  z-index: 999;
  position: absolute;
  display: flex;
  flex-direction: row;
`;

const RatingContainer = styled.View`
  position: absolute;
  top: ${DimSize.contentSidesPadding()};
  right: ${DimSize.windowSidesPadding()};
`;

const ContentWrapper = styled.View`
  flex: 1;
  margin-left: ${DimSize.contentSidesPadding()};
  align-self: flex-end;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const Title = styled.Text`
  color: ${props => props.color};
  font-size: ${DimSize.height('2.5%')};
  padding-bottom: ${DimSize.contentSidesPadding()};
`;

const Description = styled.Text`
  color: rgba(254, 254, 254, 0.48);
  font-size: ${DimSize.height('2%')};
  overflow: hidden;
`;

const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
`;

const ImageBackdropHeight = DimSize.height('38%');
const ContainerHeight = DimSize.height('44%');
const ContainerWidth = DimSize.width('100%');
const posterHeight = DimSize.height('20%');

/* eslint-disable */
class Backdrop extends PureComponent {
  render() {
    const { name, score, date, backdrop_path, poster_path, overview } = this.props;
    return (
      <Container height={ContainerHeight} width={ContainerWidth}>
        <ImageBackdrop height={ImageBackdropHeight} url={backdrop_path} />
        <RatingContainer>{score > 0 && <Rating score={score} />}</RatingContainer>
        <ContentContainer>
          <Poster height={posterHeight} url={poster_path} />
          <ContentWrapper>
            <FlexRow>
              <Title color="#fefefe">
                {name}
                <Title color="rgba(254,254,254,0.48)">{dateFormat(date)}</Title>
              </Title>
            </FlexRow>
            <FlexRow>
              <Description>{overview}</Description>
            </FlexRow>
          </ContentWrapper>
        </ContentContainer>
      </Container>
    );
  }
}

export default Backdrop;
