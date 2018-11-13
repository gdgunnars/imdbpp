import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Spinner from '../spinners';
import { Theme, DimSize } from '../../common';

const Container = styled.View`
  position: absolute;
  z-index: 9999;
  height: ${DimSize.height('100%') - Theme.sizes.tabBar.height};
  padding-bottom: ${props => (props.hasBar ? Theme.sizes.navBar.height : 0)};
`;

class Loading extends PureComponent {
  render() {
    const { isLoading, screenHasNavbar } = this.props;

    if (isLoading) {
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
