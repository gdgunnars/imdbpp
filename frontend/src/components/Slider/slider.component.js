import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';
import Poster from '../poster';

const height = DimSize.height('32%');
const sWidth = DimSize.width('2%');

const Seperator = styled.View`
  width: ${sWidth};
  height: 100%;
`;

class Slider extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <FlatList
        horizontal
        data={items}
        ItemSeparatorComponent={() => <Seperator />}
        renderItem={({ item }) => <Poster height={height} url={item.poster_path} />}
        snapToInterval={height * 0.7 + sWidth}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
      />
    );
  }
}

export default Slider;
