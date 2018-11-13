/**
 * ToDo get view from SpinnerType obj
 * Set animation to loop
 * Stop animation on demend
 */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Animated } from 'react-native';
import { DimSize, Theme } from '../../common';

const border = styled.View`
  border-top-width: 10;
  border-bottom-width: 10;
  border-right-width: 10;
  border-left-width: 10;
  border-top-color: #979799;
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-right-color: transparent;
`;

const SpinnerWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${DimSize.height('100%') - Theme.sizes.tabBar.height};
  width: ${DimSize.width('100%')};
  background-color: ${Theme.colors.background.dark};
  z-index: 2;
`;

const SpinnerOne = styled(border)`
  height: 200;
  width: 200;
  border-radius: 100;
`;

const SpinnerChildOne = styled(SpinnerOne)`
  margin-top: 10px;
  height: 100%;
  width: 100%;
  align-self: center;
  border-top-color: #bababc;
  border-radius: 90;
`;

const SpinnerChildTwo = styled(SpinnerOne)`
  margin-top: 10px;
  height: 90%;
  width: 90%;
  align-self: center;
  border-top-color: #d9d9db;
  border-radius: 70;
`;

class CircleSpinner extends PureComponent {
  componentWillMount() {
    this._animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this._animatedValue, {
        toValue: 100,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }

  render() {
    const interpolatedRotateAnimation = this._animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <SpinnerWrapper>
        <Animated.View style={[{ transform: [{ rotate: interpolatedRotateAnimation }] }]}>
          <SpinnerOne>
            <Animated.View style={[{ transform: [{ rotate: interpolatedRotateAnimation }] }]}>
              <SpinnerChildOne>
                <Animated.View style={[{ transform: [{ rotate: interpolatedRotateAnimation }] }]}>
                  <SpinnerChildTwo />
                </Animated.View>
              </SpinnerChildOne>
            </Animated.View>
          </SpinnerOne>
        </Animated.View>
      </SpinnerWrapper>
    );
  }
}
export default CircleSpinner;
