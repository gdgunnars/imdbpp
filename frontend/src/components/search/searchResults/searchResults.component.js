import React from 'react';
import styled from 'styled-components';
import { FlatList, Text } from 'react-native';
import { Icon } from 'expo';
import { stringify } from 'querystring';
import { getSearchResults } from '../../../dummyData';
import * as DimSize from '../../../common/dimensionSize';

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

const NameRole = styled.View`
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

const SubTexContainer = styled.Text`
  font-size: ${DimSize.height('2%')};
  color: #edeeef;
`;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const SearchResults = (props) => {
  const { searchResults } = props;

  return (
    <FlatList
      data={searchResults}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ListItems>
          <ProfileImgContainer>
            <ProfileImg source={{ uri: item.image }} />
          </ProfileImgContainer>
          <NameRole>
            <Name>
              {item.displayName}
            </Name>
            <SubTexContainer>
              {capitalizeFirstLetter(item.type)}
            </SubTexContainer>
          </NameRole>
          <Remove>
            <Icon.FontAwesome name="close" color="white" size={32} />
          </Remove>
        </ListItems>
      )}
    />
  );
};

export default SearchResults;
