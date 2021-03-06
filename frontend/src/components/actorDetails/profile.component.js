import React from 'react';
import styled from 'styled-components';
import { DimSize, Theme, IsIos } from '../../common';
import OverlayEdges from '../../../assets/images/overlay-edges.png';
import DefaultUserImage from '../../../assets/images/defaultUserImage.png';

const textColor = Theme.colors.text;
const textSize = Theme.sizes.text;

const MainContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: ${DimSize.height('38%')};
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

const OverlayImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${DimSize.height('38%')};
  width: ${DimSize.width('100%')};
`;

const Image = styled.Image`
  height: ${DimSize.height('16%')};
  width: ${DimSize.height('16%')};
  border-radius: ${IsIos() ? DimSize.height('8%') : DimSize.height('16%')};
  border-width: 4px;
  border-color: white;
  margin-top: ${Theme.sizes.spaces.content.large.top};
  margin-bottom: ${Theme.sizes.spaces.content.medium.bottom};
`;

const Name = styled.Text`
  text-align: center;
  color: ${textColor.person};
  font-size: ${textSize.huge};
`;

const Role = styled.Text`
  text-align: center;
  color: ${textColor.default};
  font-size: ${textSize.large};
`;

const Profile = (props) => {
  const {
    backdropPath, posterPath, name, role,
  } = props;

  const img = posterPath ? { uri: posterPath } : DefaultUserImage;
  return (
    <MainContainer>
      <BackImagecontainer>
        {backdropPath !== '' && (
          <BackImage blurRadius={2} source={{ uri: backdropPath }} resizeMode="cover" />
        )}
        <OverlayImage source={OverlayEdges} resizeMode="stretch" />
      </BackImagecontainer>
      <Image source={img} />
      <Name>{name}</Name>
      <Role>{role}</Role>
    </MainContainer>
  );
};

export default Profile;
