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

const Roles = styled.View`
  display: flex;
  flex-direction: row;
`;

const RoleContainer = styled.Text`
  font-size: ${DimSize.height('2%')};
  color: #edeeef;
`;

const mapObjectToDisplayType = data => ({
  id: data.id,
  displayName: data.title ? data.title : data.name,
  image: data.poster_path ? data.poster_path : data.profile_path,
  popularity: data.popularity,
});

// -----------------------
// - Results
// - Tom Hanks - Actor
// -> known for>
// - - Forrest Gump
// - - Toy story
// - - Saving private ryan
// - Saturday Night LIve: Best of Tom Hanks - TV
// - Killing Lincoln - Movie

const SearchResults = (props) => {
  const { searchResults } = props;

  return (
    <FlatList
      data={searchResults}
      keyExtractor={item => stringify(item.id)}
      renderItem={({ item }) => (
        <ListItems>
          <ProfileImgContainer>
            <ProfileImg source={{ uri: item.image }} />
          </ProfileImgContainer>
          <NameRole>
            <Name>
              {item.type}
              {' - '}
              {item.displayName}
            </Name>
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
