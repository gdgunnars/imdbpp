import React from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import { Icon } from 'expo';
import * as DimSize from '../../common/dimensionSize';

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
  color: ${props => props.color || '#edeeef'};
  padding-left: ${props => props.indent || 0};
`;

const capitalizeFirstLetter = value => value && value.charAt(0).toUpperCase() + value.slice(1);
const checkIfGenreAvailable = genres => (genres.length > 0 ? genres[0].name : '');
const getSingleGenre = genres => (genres && typeof genres === 'object' && genres.length >= 1 && checkIfGenreAvailable(genres.filter(Boolean)));

const SearchResults = (props) => {
  const { searchResults } = props;

  return (
    <FlatList
      data={searchResults}
      keyExtractor={item => item.id.toString()}
      height={DimSize.height('74%')}
      renderItem={({ item }) => (
        <ListItems>
          <ProfileImgContainer>
            <ProfileImg source={{ uri: item.posterPath ? item.posterPath : item.profilePath }} />
          </ProfileImgContainer>
          <NameRole>
            <Name>
              {item.name}
            </Name>
            <SubTexContainer>
              {`${capitalizeFirstLetter(item.type)} ${item.genres ? ` | ${getSingleGenre(item.genres)}` : ''} `}
            </SubTexContainer>
            {item.knownFor
              && item.knownFor.map(obj => (
                <SubTexContainer key={obj.id.toString()} indent="10" color="gray">
                  {obj.name}
                </SubTexContainer>
              ))
            }
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
