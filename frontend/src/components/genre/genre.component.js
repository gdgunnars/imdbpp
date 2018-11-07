import React from 'react';
import styled from 'styled-components';
import { Theme, DimSize } from '../../common';
import { Text } from '../../general';

const GenreContainer = styled.View`
  padding-left: ${DimSize.width('1.5%')};
  padding-right: ${DimSize.width('1.5%')};
  padding-top: ${DimSize.width('1%')};
  padding-bottom: ${DimSize.width('1%')};
  background-color: ${props => props.color};
  border-radius: ${DimSize.width('1%')};
  margin-right: ${props => (props.withMargin ? Theme.sizes.spaces.content.small.right : '0')};
`;

const GenreComponent = ({ type = 'default', text, withMargin }) => (
  <GenreContainer color={Theme.colors.background[type]} withMargin={withMargin}>
    <Text.caption color={type}>{text}</Text.caption>
  </GenreContainer>
);

export default GenreComponent;
