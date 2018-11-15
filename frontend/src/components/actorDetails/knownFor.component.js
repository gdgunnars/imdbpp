import React from 'react';
import styled from 'styled-components';
import { DimSize, Theme } from '../../common';

const MainContainer = styled.View`
    height: ${DimSize.height('30%')};
    width: ${DimSize.width('100%')};
    background-color: pink;
`;

const Test = styled.Text`
    color: white;
`;

const KnownFor = () => {

    return (
        <MainContainer>
            <Test>Slider with movies person has been in</Test>
        </MainContainer>
    )
}

export default KnownFor;