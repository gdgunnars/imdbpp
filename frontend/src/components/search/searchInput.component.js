import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { Header } from 'react-navigation';
import { Keyboard } from 'react-native';
import { Motion, spring } from 'react-motion';
import * as DimSize from '../../common/dimensionSize';
import { navigate, goBack } from '../../navigation';

const InputContainer = styled.View`
  background: #424242;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${DimSize.statusBarHeight()};
  height: ${Header.HEIGHT};
  padding-left: ${DimSize.windowSidesPadding()};
  padding-right: ${DimSize.windowSidesPadding()};
`;

const AbsoluteTitleContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16;
  margin-left: ${DimSize.contentSidesPadding()};
  color: #fefefe;
`;

const SearchTitle = styled.Text`
  color: #fefefe;
  font-size: 16;
`;

class SearchInput extends PureComponent {
  inputRef = React.createRef();

  state = {
    focused: true,
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyBoardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyBoardDidHide = () => {
    this.inputRef.current.blur();
    this.setState({
      focused: false,
    });
  };

  render() {
    const { onSearch } = this.props;
    const { focused } = this.state;
    return (
      <Motion
        defaultStyle={{
          opacity: 0,
          inputOpacity: 1,
          marginLeftRight: 0,
          marginTop: DimSize.statusBarHeight(),
          height: Header.HEIGHT,
          borderRadius: 0,
        }}
        style={{
          opacity: focused ? spring(0) : spring(1),
          inputOpacity: focused ? spring(1) : spring(0),
          marginLeftRight: focused ? spring(0) : spring(DimSize.windowSidesPadding() / 1.5),
          marginTop: focused
            ? spring(DimSize.statusBarHeight())
            : spring(DimSize.statusBarHeight() + Math.round(DimSize.contentSidesPadding())),
          height: focused
            ? spring(Header.HEIGHT)
            : spring(Header.HEIGHT - Math.round(DimSize.windowSidesPadding())),
          borderRadius: focused ? spring(0) : spring(DimSize.width('2%')),
        }}
      >
        {animation => (
          <InputContainer
            style={{
              marginTop: animation.marginTop,
              height: animation.height,
              borderRadius: animation.borderRadius,
              marginLeft: animation.marginLeftRight,
              marginRight: animation.marginLeftRight,
            }}
          >
            <Icon.Entypo name="chevron-thin-left" color="#C1C1C1" size={16} onPress={goBack} />
            <Input
              style={{ opacity: animation.inputOpacity }}
              type="text"
              underlineColorAndroid="transparent"
              onChangeText={onSearch}
              ref={this.inputRef}
              onBlur={() => this.setState({ focused: false })}
              onFocus={() => {
                this.setState({ focused: true });
              }}
              autoFocus
            />
            <Icon.SimpleLineIcons
              name="camera"
              color="#C1C1C1"
              size={DimSize.height('3%')}
              onPress={() => navigate('Camera', {})}
            />
            <AbsoluteTitleContainer style={{ opacity: animation.opacity }} pointerEvents="none">
              <SearchTitle>Search</SearchTitle>
            </AbsoluteTitleContainer>
          </InputContainer>
        )}
      </Motion>
    );
  }
}

export default SearchInput;
