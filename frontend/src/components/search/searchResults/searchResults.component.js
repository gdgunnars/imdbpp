import React from 'react';
import styled from 'styled-components';
import { getSearchResults } from '../../../dummyData';
import { SectionList, Text } from 'react-native';
import * as DimSize from '../../../common/dimensionSize';
import { Icon } from 'expo';


const TitleSection = styled.Text`
  font-size: ${DimSize.height('3%')};
  font-weight: bold;
  color: white;
`;

const ListItems = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${DimSize.width('100%')};
  padding: 5px;
`;

const ProfileImgContainer = styled.View`
  flex: 2;
  align-items: center;
`;

const Name_role = styled.View`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Remove = styled.View`
  flex: 1;
  align-items: center;
`;

const ProfileImg = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 50;
`;

const Name = styled.Text`
  font-size: ${DimSize.height('3%')};
  color: #ffffff;
`;

const Roles = styled.View`
  display: flex;
  flex-direction: row;
`;

const RoleContainer = styled.Text`
  font-size: ${DimSize.height('2%')};
  color: #edeeef;
`;



const SearchResults = () => {

  const listData = getSearchResults();
  return (

    <SectionList
      renderItem={({ item, index, section }) =>
        <ListItems key={index} >
          <ProfileImgContainer>
            <ProfileImg
              source={{ uri: item.actor_photo_url !== undefined ? item.actor_photo_url : item.movie_poster_url }}>
            </ProfileImg>
          </ProfileImgContainer>
          <Name_role>
            <Name>
              {item.movie}
              {item.actor}
            </Name>
            <RoleContainer>
              {item.role ? `${item.role[0]} | ${item.role[1]}` : `${item.genre[0]} | ${item.genre[1]}`}
            </RoleContainer>
          </Name_role>
          <Remove>
            <Icon.FontAwesome name={'close'} color={'white'} size={32} />
          </Remove>

        </ListItems>}
      renderSectionHeader={({ section: { title } }) => (
        <TitleSection >{title}</TitleSection>
      )}
      sections={listData}
      keyExtractor={(item, index) => item + index}
    />

  )
}

export default SearchResults; 