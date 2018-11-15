import React from 'react';
import styled from 'styled-components';
import { DimSize, Theme } from '../../common';

const MainContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: ${DimSize.height('30%')};
    width: ${DimSize.width('100%')};
    background-color: blue;
`;

const Text = styled.Text`
    color: white;
    font-size: 20;
`;

const Relations = () => {
    return (
        <MainContainer>
            <Text>
                Slider with people that have worked with this actor
            </Text>
        </MainContainer>
    )
}

export default Relations;