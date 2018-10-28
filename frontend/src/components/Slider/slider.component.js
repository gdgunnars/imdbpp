import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';

const seperatorWidth = DimSize.width('2%');

const NormalSeperator = styled.View`
  width: ${seperatorWidth};
  height: 100%;
`;

const NoSeperator = styled.View`
  width: 0;
  height: 100%;
`;

class Slider extends PureComponent {
  render() {
    const { items, seperator, snapWidth } = this.props;

    const Seperator = seperator ? NormalSeperator : NoSeperator;
    return (
      <FlatList
        horizontal
        data={items}
        ItemSeparatorComponent={() => <Seperator />}
        renderItem={({ item }) => item}
        snapToInterval={snapWidth}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        centerContent
      />
    );
  }
}

export default Slider;
