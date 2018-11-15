import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Spinner from '../spinners';
import { Theme } from '../../common';

const Container = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: ${Theme.sizes.window.height};
  background-color: ${Theme.colors.background.dark};
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
    const { isLoading, screenHasNavbar, delay } = this.props;
    const { isDelaying } = this.state;

    if (delay && (isLoading || isDelaying)) {
      return (
        <Container hasBar={screenHasNavbar}>
          <Spinner spinnerType="circle" />
        </Container>
      );
    }

    if (!delay && isLoading) {
      return (
        <Container hasBar={screenHasNavbar}>
          <Spinner spinnerType="circle" />
        </Container>
      );
    }

    return null;
  }
}

export default Loading;
