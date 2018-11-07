import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { Header } from 'react-navigation';
import { Keyboard } from 'react-native';
import { Motion, spring } from 'react-motion';
import * as DimSize from '../../common/dimensionSize';
import { navigate, goBack } from '../../navigation';

const InputContainer = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  margin-top: ${DimSize.statusBarHeight() + Math.round(DimSize.contentSidesPadding())};
  height: ${Header.HEIGHT - Math.round(DimSize.windowSidesPadding())};
  border-radius: ${DimSize.width('2%')};
  margin-left: ${DimSize.windowSidesPadding() / 1.5};
  margin-right: ${DimSize.windowSidesPadding() / 1.5};
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${DimSize.windowSidesPadding()};
  padding-right: ${DimSize.windowSidesPadding()};
  margin-bottom: ${Math.round(DimSize.contentSidesPadding())};
  z-index: 10;
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
    focused: false,
    inputText: '',
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyBoardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  shouldBlurInput = () => {
    const { inputText } = this.state;
    if (inputText.trim() === '') {
      this.inputRef.current.blur();
      this.setState({
        focused: false,
      });
    }
  };

  keyBoardDidHide = () => {
    this.shouldBlurInput();
  };

  handleOnInputChange = (val) => {
    const { onSearch } = this.props;
    this.setState({
      inputText: val,
    });
    onSearch(val);
  };

  handleOnClose = () => {
    const { onSearch } = this.props;
    this.inputRef.current.blur();
    this.setState({
      inputText: '',
      focused: false,
    });
    onSearch('');
  };

  render() {
    const { focused, inputText } = this.state;
    const animConfig = { stiffness: 300, damping: 26 };
    return (
      <Motion
        defaultStyle={{
          opacity: 1,
          inputOpacity: 0,
          marginLeftRight: DimSize.windowSidesPadding() / 1.5,
          marginTop: DimSize.statusBarHeight() + Math.round(DimSize.contentSidesPadding()),
          height: Header.HEIGHT - Math.round(DimSize.windowSidesPadding()),
          borderRadius: DimSize.width('2%'),
          marginBottom: Math.round(DimSize.contentSidesPadding()),
        }}
        style={{
          opacity: focused ? spring(0, animConfig) : spring(1, animConfig),
          inputOpacity: focused ? spring(1, animConfig) : spring(0, animConfig),
          marginLeftRight: focused
            ? spring(0, animConfig)
            : spring(DimSize.windowSidesPadding() / 1.5, animConfig),
          marginTop: focused
            ? spring(DimSize.statusBarHeight(), animConfig)
            : spring(
              DimSize.statusBarHeight() + Math.round(DimSize.contentSidesPadding()),
              animConfig,
            ),
          height: focused
            ? spring(Header.HEIGHT, animConfig)
            : spring(Header.HEIGHT - Math.round(DimSize.windowSidesPadding()), animConfig),
          borderRadius: focused ? spring(0, animConfig) : spring(DimSize.width('2%'), animConfig),
          marginBottom: focused
            ? spring(0, animConfig)
            : spring(Math.round(DimSize.contentSidesPadding()), animConfig),
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
              marginBottom: animation.marginBottom,
            }}
          >
            <Icon.Entypo name="chevron-thin-left" color="#C1C1C1" size={16} onPress={goBack} />
            <Input
              style={{ opacity: animation.inputOpacity }}
              type="text"
              value={inputText}
              underlineColorAndroid="transparent"
              onChangeText={this.handleOnInputChange}
              ref={this.inputRef}
              onBlur={() => this.shouldBlurInput}
              onFocus={() => {
                if (focused) {
                  return;
                }
                this.setState({ focused: true });
              }}
            />
            {inputText === '' && (
              <Icon.SimpleLineIcons
                name="camera"
                color="#C1C1C1"
                size={DimSize.height('3%')}
                onPress={() => navigate('Camera', {})}
              />
            )}
            {inputText !== '' && (
              <Icon.EvilIcons
                name="close"
                color="#C1C1C1"
                size={DimSize.height('4%')}
                onPress={this.handleOnClose}
              />
            )}
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
