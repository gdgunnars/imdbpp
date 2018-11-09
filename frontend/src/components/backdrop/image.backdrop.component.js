import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../common';
import OverlayEdges from '../../../assets/images/overlay-edges.png';
import FakeShadow from './fakeShadow.backdrop.component';

const Container = styled.View`
  height: ${props => props.height};
  width: 100%;
  background-color: #141414;
  position: relative;
`;

const BackdropImage = styled.Image`
  height: ${props => props.height};
  width: ${Theme.sizes.window.width};
`;

const OverlayImage = styled(BackdropImage)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const BackdropImageContainer = (props) => {
  const { url, height } = props;
  return (
    <Container height={height}>
      <BackdropImage source={{ uri: url }} height={height} resizeMode="cover" />
      <OverlayImage source={OverlayEdges} height={height} resizeMode="stretch" />
      <FakeShadow height={height * 0.05} position="bot" />
    </Container>
  );
};

export default BackdropImageContainer;
