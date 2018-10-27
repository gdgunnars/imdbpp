import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as DimSize from '../common/dimensionSize';

const Container = styled.View`
  width: 100%;
  height: ${() => DimSize.height('35%')};
  background-color: green;
`;

class Backdrop extends PureComponent {
  render() {
    return <Container />;
  }
}

export default Backdrop;
