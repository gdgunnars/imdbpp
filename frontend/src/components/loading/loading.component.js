import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Spinner from '../spinners';
import { Theme, DimSize } from '../../common';

const Container = styled.View`
  position: absolute;
  height: ${props => (props.fullScreen ? DimSize.height('100%') : 0)};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding-bottom: ${props => (props.hasBar ? Theme.sizes.navBar.height : 0)};
`;

class Loading extends PureComponent {
  state = { isDelaying: false };

  componentWillMount = () => {
    const { delay } = this.props;
    if (delay) {
      this.setState({ isDelaying: true });
      setTimeout(() => this.setState({ isDelaying: false }), delay);
    }
  };

  render() {
    const {
      isLoading, screenHasNavbar, delay, fullScreen,
    } = this.props;
    const { isDelaying } = this.state;

    if (delay && (isLoading || isDelaying)) {
      return (
        <Container hasBar={screenHasNavbar} fullScreen={fullScreen}>
          <Spinner spinnerType="circle" />
        </Container>
      );
    }

    if (!delay && isLoading) {
      return (
        <Container hasBar={screenHasNavbar} fullScreen={fullScreen}>
          <Spinner spinnerType="circle" />
        </Container>
      );
    }

    return null;
  }
}

export default Loading;
