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

const capitalizeFirstLetter = value => value.charAt(0).toUpperCase() + value.slice(1);

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
            <ProfileImg source={{ uri: item.image }} />
          </ProfileImgContainer>
          <NameRole>
            <Name>
              {item.displayName}
            </Name>
            <SubTexContainer>
              {`${capitalizeFirstLetter(item.type)} | Popularity: ${item.popularity}`}
            </SubTexContainer>
            {
              item.knownFor.map(obj => (
                <SubTexContainer key={obj.id.toString()} indent="10" color="gray">
                  {obj.title}
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
