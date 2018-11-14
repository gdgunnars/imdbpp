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
  state = { page: 0, lastPage: 0 }

  timeout = null;

  componentDidMount = () => {
    const { seperator } = this.props;
    if (!seperator) {
      this.autoSwipe();
    }
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  }

  autoSwipe = () => {
    const { items } = this.props;
    const { page } = this.state;
    const next = page < items.length - 1 ? page + 1 : 0;

    this.setState({ lastPage: page });

    this.timeout = setTimeout(() => {
      this.setState({ page: next });
      this.autoSwipe();
    }, 6000);
  }

  onManualSwipe = () => {
    const { page, lastPage } = this.state;

    // Check if this is a manual swipe and cancel the auto swipe if so.
    if (page <= lastPage) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { items, seperator, snapWidth } = this.props;
    const { page } = this.state;
    const sneak = seperator ? snapWidth / 1.5 : 0;

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
        currentPage={page}
        swipeThreshold={0.1}
        onPageChange={this.onManualSwipe}
      >
        {items.map(item => item)}
      </Carousel>
    );
  }
}

export default Slider;
