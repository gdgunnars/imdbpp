import React from 'react';
import styled from 'styled-components';
import Spinner from '../spinners';
import { Theme } from '../../common';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: ${({ fullScreen }) => Theme.sizes.window.height - (fullScreen ? 0 : Theme.sizes.tabBar.height)};
  background-color: ${Theme.colors.background.dark};
  padding-bottom: ${props => (props.hasBar ? Theme.sizes.navBar.height : 0)};
`;

export default ({ fullScreen }) => (
  <Container fullScreen={fullScreen}>
    <Spinner />
  </Container>
);
