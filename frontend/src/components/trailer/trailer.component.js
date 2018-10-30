import React, { PureComponent } from 'react';
import { Video } from 'expo';
import styled from 'styled-components';
import Buttons from '../buttons';
import * as DimSize from '../../common/dimensionSize';

const Container = styled.View`
  position: relative;
`;

const ButtonContainerStyle = styled.View`
  position: absolute;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const ButtonContainer = ({ width, height, children }) => (
  <ButtonContainerStyle width={width} height={height} pointerEvents="box-none">
    {children}
  </ButtonContainerStyle>
);

class Trailer extends PureComponent {
  state = {
    play: false,
  };

  handlePlayButton = () => {
    const { play } = this.state;
    this.setState({ play: !play });
  };

  render() {
    const { play } = this.state;
    const {
      src, poster, width, height,
    } = this.props;

    return (
      <Container style={{ width, height }}>
        <ButtonContainer width={width} height={height}>
          <Buttons name={play ? 'pause' : 'play'} size="7%" onPress={this.handlePlayButton} />
        </ButtonContainer>
        <Video
          source={{ uri: src }}
          posterSource={{ uri: poster }}
          resizeMode="cover"
          isMuted={false}
          style={{ width, height }}
          shouldPlay={play}
          usePoster
          useNativeControls
        />
      </Container>
    );
  }
}

export default Trailer;
