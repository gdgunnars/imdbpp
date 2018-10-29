import React, { PureComponent } from 'react';
import Carousel from 'react-native-carousel-control';

class Slider extends PureComponent {
  render() {
    const { items, seperator, snapWidth } = this.props;
    const sneak = seperator ? snapWidth / 1.5 : 0;
    const currPage = seperator ? items.length / 2 : 0;

    return (
      <Carousel
        pageWidth={snapWidth}
        pageStyle={{ alignSelf: 'flex-start' }}
        sneak={sneak}
        currentPage={currPage}
        swipeThreshold={0.3}
      >
        {items.map(item => item)}
      </Carousel>
    );
  }
}

export default Slider;
