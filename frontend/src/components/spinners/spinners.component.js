import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';
import { Animated } from 'react-native';

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
    height: ${DimSize.height('100%')};
    width: ${DimSize.width('100%')};
    background-color: #2C2C2C;
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
    height: 100%;
    width: 100%;
    align-self: center;
    border-top-color: #d9d9db;
    border-radius: 80;
`;


class Spinners extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isAnimating: true };
    }
    componentWillMount() {
        this._animatedValue = new Animated.Value(0);
    };

    componentDidMount() {
        Animated.timing(this._animatedValue, {
            toValue: 100,
            duration: 3000,
            delay: 200,
            useNativeDriver: true,
            iterations: 5
        }).start();
    }

    render() {
        var interpolatedRotateAnimation = this._animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg']
        });

        const { name } = this.props;

        return (
            <SpinnerWrapper>
                <Animated.View style={[{ transform: [{ rotate: interpolatedRotateAnimation }] }]} >
                    <SpinnerOne>
                        <Animated.View style={[{ transform: [{ rotate: interpolatedRotateAnimation }] }]}>
                            <SpinnerChildOne>
                                <Animated.View style={[{ transform: [{ rotate: interpolatedRotateAnimation }] }]}>
                                    <SpinnerChildTwo>
                                    </SpinnerChildTwo>
                                </Animated.View>
                            </SpinnerChildOne>
                        </Animated.View>
                    </SpinnerOne>
                </Animated.View>
            </SpinnerWrapper>
        )
    }
}

const SpinnerType = {
    circle: () => (
        <SpinnerWrapper>
            <Animated.View style={[{ transform: [{ rotate: interpolatedRotateAnimation }] }]}>
                <SpinnerOne>
                    <Animated.View style={[{ transform: [{ rotate: interpolatedRotateAnimation }] }]}>
                        <SpinnerChildOne>
                            <Animated.View style={[{ transform: [{ rotate: interpolatedRotateAnimation }] }]}>
                                <SpinnerChildTwo>
                                </SpinnerChildTwo>
                            </Animated.View>
                        </SpinnerChildOne>
                    </Animated.View>
                </SpinnerOne>
            </Animated.View>
        </SpinnerWrapper>
    )
}

export default Spinners;


/**
 * import React from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';
import { Animated } from 'react-native';

const border = styled.View`
    border-top-width: 10;
    border-bottom-width: 10;
    border-right-width: 10;
    border-left-width: 10;
    border-top-color: #3498db;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
`;

const SpinnerWrapper = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${DimSize.height('100%')};
    width: ${DimSize.width('100%')};
    background-color: purple;
    z-index: 2;
`;

const SpinnerOne = styled(border)` 
    height: 200;
    width: 200;
    background-color: pink;
    border-radius: 100;
`;

const SpinnerChildOne = styled(SpinnerOne)`
    margin-top: 10px;
    height: 90%;
    width: 90%;
    align-self: center;
    background-color: blue;
    border-top-color: #e78c4c;
    border-radius: 80;
`;

const SpinnerChildTwo = styled(SpinnerOne)`
    margin-top: 10px;    
    height: 80%;
    width: 80%;
    align-self: center;
    background-color: blue;
    background-color: green;
    border-top-color: #f9c922;
    border-radius: 57;
`;

const text = styled.Text`
    color: white;
`;
this._animatedValue = new Animated.Value(0);

Animated.timing(this._animatedValue, {
    toValue: 100,
    duration: 3000
}).start(); 

const Spinners = {
    circle: () => (
        <SpinnerWrapper>
            <SpinnerOne>
                <SpinnerChildOne>
                    <SpinnerChildTwo>
                    </SpinnerChildTwo>
                </SpinnerChildOne>
            </SpinnerOne>
        </SpinnerWrapper>
    )
}

export default Spinners;*/