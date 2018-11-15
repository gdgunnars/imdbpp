import React from 'react';
import styled from 'styled-components';
import { DimSize, Theme } from '../../common';

const textColor = Theme.colors.text;
const textSize = Theme.sizes.text;

const MainContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: ${DimSize.height('50%')};
    width: ${DimSize.width('100%')};
    position: relative;
`;

const BackImagecontainer = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.8;
    z-index: -1;
`;

const BackImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const Image = styled.Image`
    height: ${DimSize.height('30%')};
    width: ${DimSize.height('30%')};
    border-radius: 200;
    border-width: 4px;
    border-color: white;
    margin-top: 20;
`;

const Name = styled.Text`
    text-align: center;
    color: ${textColor.person};
    font-weight: bold;
    font-size: ${textSize.grand};
`;
 
const Role = styled.Text`
    text-align: center;
    color: ${textColor.default};
    font-size: ${textSize.large};
`;
//  <Image source={{ uri: 'http://www.gstatic.com/tv/thumb/persons/57282/57282_v9_bb.jpg' }} />
// <BackImage blurRadius={5} source={{ uri: 'https://cdn-images-1.medium.com/max/1920/1*0ubYRV_WNR9iYrzUAVINHw.jpeg' }} />
const Profile = (props) => {
    const { backdropPath, posterPath, name, role } = props;
    return (
        <MainContainer>
            <BackImagecontainer>
            <BackImage blurRadius={5} source={{ uri: 'https://cdn-images-1.medium.com/max/1920/1*0ubYRV_WNR9iYrzUAVINHw.jpeg' }} />
            </BackImagecontainer>
            <Image source={{ uri: posterPath }} />
            <Name>{ name }</Name>
            <Role>{ role }</Role>
        </MainContainer>
    )
}

export default Profile;