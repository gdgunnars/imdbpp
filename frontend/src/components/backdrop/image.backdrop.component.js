import React from 'react';
import styled from 'styled-components';
import FakeShadow from './fakeShadow.backdrop.component';

const Container = styled.View`
  height: ${props => props.height};
  width: 100%;
  background-color: #141414;
  position: relative;
`;

const BackdropImage = styled.Image`
  height: ${props => props.height};
`;

const BackdropImageContainer = (props) => {
  const { url, height } = props;
  return (
    <Container height={height}>
      <BackdropImage source={{ uri: url }} height={height} resizeMode="cover" />
      <FakeShadow position="top" height={height * 0.15} />
      <FakeShadow position="bottom" height={height * 0.4} />
    </Container>
  );
};

export default BackdropImageContainer;
