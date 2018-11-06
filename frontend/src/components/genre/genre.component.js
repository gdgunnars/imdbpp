import React from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';
import Theme from '../../common/theme';

const GenreContainer = styled.View`
  padding-left: ${DimSize.width('1.5%')};
  padding-right: ${DimSize.width('1.5%')};
  padding-top: ${DimSize.width('1%')};
  padding-bottom: ${DimSize.width('1%')};
  background-color: ${props => props.color};
  border-radius: ${DimSize.width('1%')};
  margin-right: ${props => (props.withMargin ? DimSize.width('1.5%') : '0')};
`;

const GenreText = styled.Text`
  font-size: 12;
  color: ${props => props.color};
`;

const GenreComponent = ({ type = 'default', text, withMargin }) => (
  <GenreContainer color={Theme.colors.background[type]} withMargin={withMargin}>
    <GenreText color={Theme.colors.text[type]}>{text}</GenreText>
  </GenreContainer>
);

export default GenreComponent;
