import React, { PureComponent } from 'react';
import { Video } from 'expo';
import styled from 'styled-components';
import Buttons from '../buttons';
import Rating from '../rating';
import ImageBackdrop from '../backdrop/image.backdrop.component';
import * as DimSize from '../../common/dimensionSize';

const Container = styled.View`
  position: relative;
`;

const ButtonContainerStyle = styled.View`
  position: absolute;
  z-index: 3;
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

const RatingContainer = styled.View`
  position: absolute;
  top: ${DimSize.statusBarHeight() + DimSize.contentSidesPadding()};
  right: ${DimSize.windowSidesPadding()};
  z-index: 99;
`;

const containsTrailer = src => src != null && src.includes('https');

class Trailer extends PureComponent {
  trailerRef = null;

  state = {
    play: false,
  };

  handlePlayButton = () => {
    const { play } = this.state;
    if (!play) {
      this.setState({ play: true });
      this.trailerRef.playAsync();
    }
  };

  render() {
    const { play } = this.state;
    const {
      src, poster, width, height, score,
    } = this.props;
    return (
      <Container style={{ width, height }}>
        {!play && (
          <ButtonContainer width={width} height={height}>
            <ImageBackdrop url={poster} height={height} />
            {containsTrailer(src) && (
              <ButtonContainer width={width} height={height}>
                <Buttons.play size={DimSize.height('7%')} onPress={this.handlePlayButton} />
              </ButtonContainer>
            )}
            <RatingContainer>
              <Rating score={score} />
            </RatingContainer>
          </ButtonContainer>
        )}
        {containsTrailer(src) && (
          <Video
            source={{ uri: src }}
            resizeMode="cover"
            isMuted={false}
            style={{ width, height }}
            usePoster
            useNativeControls
            ref={(ref) => {
              this.trailerRef = ref;
            }}
          />
        )}
      </Container>
    );
  }
}

export default Trailer;
