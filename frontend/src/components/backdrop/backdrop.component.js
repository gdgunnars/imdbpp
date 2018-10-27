import React from 'react';
import styled from 'styled-components';
import ImageBackdrop from './image.backdrop.component';
import Poster from '../poster';
import Rating from '../rating';
import * as DimSize from '../../common/dimensionSize';

const Container = styled.View`
  position: relative;
  height: ${props => props.height};
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
  font-size: ${DimSize.height('1.5%')};
  overflow: hidden;
`;

const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
`;

const dummyData = {
  title: 'Black Panther',
  year: '(2018)',
  description:
    "TChalla, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
};

const Backdrop = () => {
  const ImageBackdropHeight = DimSize.height('36%');
  const ContainerHeight = DimSize.height('44%');
  const posterHeight = DimSize.height('20%');
  return (
    <Container height={ContainerHeight}>
      <ImageBackdrop
        height={ImageBackdropHeight}
        url="https://i.annihil.us/u/prod/marvel/i/mg/9/03/537ba26276348.jpg"
      />
      <RatingContainer>
        <Rating score={7.5} />
      </RatingContainer>
      <ContentContainer>
        <Poster
          height={posterHeight}
          url="https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg"
        />
        <ContentWrapper>
          <FlexRow>
            <Title color="#fefefe">{dummyData.title}</Title>
            <Title color="rgba(254,254,254,0.48)">{dummyData.year}</Title>
          </FlexRow>
          <FlexRow>
            <Description>{dummyData.description}</Description>
          </FlexRow>
        </ContentWrapper>
      </ContentContainer>
    </Container>
  );
};

export default Backdrop;
