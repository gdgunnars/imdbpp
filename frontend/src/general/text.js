import React from 'react';
import styled from 'styled-components';
import Theme from '../common/theme';

// Props color should be light | dark | tv | movie | person | default
// look at theme.colors.text to see available keys

const BaseText = styled.Text`
  font-size: ${Theme.sizes.text.normal};
  color: ${({ color }) => Theme.colors.text[color]};
  font-weight: ${({ important }) => (important ? 'bold' : 'normal')};
`;
const Title = styled(BaseText)`
  font-size: ${Theme.sizes.text.large};
`;

const Huge = styled(BaseText)`
  font-size: ${Theme.sizes.text.huge};
`;

const SubTitle = styled(Title)`
  margin-left: ${Theme.sizes.spaces.window.left};
  margin-top: ${Theme.sizes.spaces.content.large.top};
  margin-bottom: ${Theme.sizes.spaces.content.small.bottom};
`;

const Caption = styled(BaseText)`
  font-size: ${Theme.sizes.text.small};
`;

const Text = {
  title: ({
    children = '', important = false, color = 'light', style = {},
  }) => (
    <Title important={important} color={color} style={style}>
      {children}
    </Title>
  ),
  huge: ({
    children = '', important = false, color = 'light', style = {},
  }) => (
    <Huge important={important} color={color} style={style}>
      {children}
    </Huge>
  ),
  subTitle: ({
    children = '', important, color = 'light', style = {},
  }) => (
    <SubTitle important={important} color={color} style={style}>
      {children.toUpperCase()}
    </SubTitle>
  ),
  body1: ({
    children = '', important = false, color = 'default', style = {},
  }) => (
    <BaseText important={important} color={color} style={style}>
      {children}
    </BaseText>
  ),
  body2: ({
    children = '', important = false, color = 'dark', style = {},
  }) => (
    <BaseText important={important} color={color} style={style}>
      {children}
    </BaseText>
  ),
  caption: ({
    children = '', important = false, color = 'default', style = {},
  }) => (
    <Caption important={important} color={color} style={style}>
      {children}
    </Caption>
  ),
};

export default Text;
