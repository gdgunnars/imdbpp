import React from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';

const SpinnerWrapper = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${DimSize.height('100%')};
    width: ${DimSize.width('100%')};
    background-color: purple;
    zindex- 2;
`;
const Spinner = styled.View`
    height: 150;
    width: 150;
    background-color: pink;
`;


const Spinners = {
    circle: () => (
        <SpinnerWrapper>
            <Spinner></Spinner>
        </SpinnerWrapper>
    )
}

export default Spinners;