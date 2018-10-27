import React from 'react';
import styled from 'styled-components';
import ImageBackdrop from './image.backdrop.component';
import * as DimSize from '../../common/dimensionSize';

const Container = styled.View`
  position: relative;
`;

const Backdrop = () => {
  const ImageBackdropHeight = DimSize.height('35%');
  return (
    <Container>
      <ImageBackdrop
        height={ImageBackdropHeight}
        url="https://i.annihil.us/u/prod/marvel/i/mg/9/03/537ba26276348.jpg"
      />
    </Container>
  );
};

export default Backdrop;
