import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PodiumPoster from './podium.poster.component';
import { DimSize } from '../../common';

const Container = styled.View`
  width: ${DimSize.width('100%')};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: baseline;
`;

class Podium extends PureComponent {
  render() {
    const { items, height } = this.props;

    return (
      <Container>
        <PodiumPoster colors={{ shade: 0.2, icon: '#e0e0ea' }} item={items[1]} height={height} />
        <PodiumPoster
          colors={{ shade: 0.3, icon: '#d9ad4a' }}
          item={items[0]}
          height={height * 1.2}
        />
        <PodiumPoster colors={{ shade: 0.1, icon: '#8b531a' }} item={items[2]} height={height} />
      </Container>
    );
  }
}

export default Podium;
