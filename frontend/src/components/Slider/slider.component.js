import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';

const cWidth = DimSize.width('35%');
const cHeight = DimSize.height('30%');
const sWidth = DimSize.width('2%');
const itemWidth = cWidth + sWidth;

const Container = styled.TouchableOpacity`
  width: ${cWidth};
  height: ${cHeight};
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 24;
  color: white;
`;

const Seperator = styled.View`
  width: ${sWidth};
  height: 100%;
`;

class Slider extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <FlatList
        horizontal={true}
        data={items}
        ItemSeparatorComponent={() => <Seperator />}
        renderItem={({ item }) => (
          <Container>
            <Text>{item.key}</Text>
          </Container>
        )}
        getItemLayout={(data, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index
        })}
        snapToInterval={itemWidth}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
      />
    );
  }
}

export default Slider;
