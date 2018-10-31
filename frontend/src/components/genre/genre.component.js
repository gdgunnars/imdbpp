import React from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';

const GenreContainer = styled.View`
  padding-left: ${DimSize.width('1.5%')};
  padding-right: ${DimSize.width('1.5%')};
  padding-top: ${DimSize.width('1%')};
  padding-bottom: ${DimSize.width('1%')};
  background-color: ${props => (props.light ? '#E63B3B' : '#1D1D1D')};
  border-radius: ${DimSize.width('1%')};
  margin-right: ${props => (props.withMargin ? DimSize.width('1.5%') : '0')};
`;

const GenreText = styled.Text`
  font-size: 12;
  color: ${props => (props.light ? '#fefefe' : '#B5B5B5')};
`;

const GenreComponent = ({ light, text, withMargin }) => (
  <GenreContainer light={light} withMargin={withMargin}>
    <GenreText light={light}>{text}</GenreText>
  </GenreContainer>
);

export default GenreComponent;
