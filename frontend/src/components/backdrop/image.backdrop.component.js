import React from 'react';
import styled from 'styled-components';
import { LinearGradient } from 'expo';

const Container = styled.View`
  height: ${props => props.height};
  background-color: green;
  position: relative;
`;

const BackdropImage = styled.Image`
  height: ${props => props.height};
`;

const ShadowContainer = styled.View`
  position: absolute;
  height: ${props => props.height};
  left: 0;
  right: 0;
`;

const ShadowTop = styled(ShadowContainer)`
  top: 0;
`;

const ShadowBottom = styled(ShadowContainer)`
  bottom: 0;
`;

const FakeShadow = ({ position, height }) => {
  const style = { height: '100%', width: '100%' };
  const colors = ['#141414', 'rgba(20,20,20, 0.25)', 'rgba(20,20,20,0)'];
  if (position === 'top') {
    return (
      <ShadowTop height={height}>
        <LinearGradient style={style} colors={colors} />
      </ShadowTop>
    );
  }
  return (
    <ShadowBottom height={height}>
      <LinearGradient style={style} colors={colors.reverse()} />
    </ShadowBottom>
  );
};

const BackdropImageContainer = (props) => {
  const { url, height } = props;
  return (
    <Container height={height}>
      <BackdropImage source={{ uri: url }} height={height} />
      <FakeShadow position="top" height={height * 0.8} />
      <FakeShadow position="bottom" height={height * 0.8} />
    </Container>
  );
};

export default BackdropImageContainer;
