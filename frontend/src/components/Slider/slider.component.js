import React, { PureComponent } from 'react';
import Carousel from 'react-native-carousel-control';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';

const Seperator = styled.View`
  width: ${DimSize.width('1%')};
  height: 100%;
`;

class Slider extends PureComponent {
  render() {
    const { items, seperator, snapWidth } = this.props;
    const sneak = seperator ? snapWidth / 1.5 : 0;
    const currPage = seperator ? Math.round(items.length / 2) : 0;

    if (seperator) {
      return (
        <View>
          <FlatList
            horizontal
            data={items}
            ItemSeparatorComponent={() => <Seperator />}
            renderItem={({ item }) => item}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    }
    return (
      <Carousel
        pageWidth={snapWidth}
        pageStyle={{ alignSelf: 'flex-start' }}
        sneak={sneak}
        currentPage={currPage}
        swipeThreshold={0.1}
      >
        {items.map(item => item)}
      </Carousel>
    );
  }
}

export default Slider;
