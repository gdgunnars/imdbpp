import React from 'react';
import { Icon } from 'expo';
import styled from 'styled-components';
import { navigate } from '../../navigation';
import Genre from '../genre';
import { DimSize, Capitalize, MediaLink } from '../../common';

const SearchItemContainer = styled.View`
  flex-direction: row;
  margin-top: ${DimSize.windowSidesPadding()};
  align-items: center;
`;

const SearchItemNaviagtionContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
`;

const SearchImageStyle = styled.Image`
  width: ${DimSize.width('20%')};
  height: ${DimSize.width('20%')};
  border-radius: ${props => (props.round ? DimSize.width('12%') : 0)};
`;

const SearchItemImage = {
  tv: url => <SearchImageStyle source={{ uri: url }} resizeMode="cover" />,
  movie: url => <SearchImageStyle source={{ uri: url }} resizeMode="cover" />,
  person: url => <SearchImageStyle round source={{ uri: url }} resizeMode="cover" />,
};

const SearchTextColumn = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: ${DimSize.windowSidesPadding()};
  margin-right: ${DimSize.windowSidesPadding()};
`;

const SearchItemName = styled.Text`
  font-size: 16;
  color: #fefefe;
`;

const SearchItemSubTitleContainer = styled.View`
  flex-direction: row;
  margin-top: ${DimSize.width('1.5%')};
`;

const SearchItem = ({ media, onRemove, onPress }) => {
  const {
    posterPath, type, name, genres = [],
  } = media;
  return (
    <SearchItemContainer>
      <SearchItemNaviagtionContainer onPress={onPress}>
        {SearchItemImage[type](posterPath)}
        <SearchTextColumn>
          <SearchItemName>{name}</SearchItemName>
          <SearchItemSubTitleContainer>
            <Genre type={type} text={Capitalize(type)} withMargin />
            {genres.slice(0, 2).map(item => (
              <Genre key={`genre_${item.name}`} text={item.name} withMargin />
            ))}
          </SearchItemSubTitleContainer>
        </SearchTextColumn>
      </SearchItemNaviagtionContainer>
      {onRemove && (
        <Icon.EvilIcons
          name="close"
          color="#C1C1C1"
          size={DimSize.height('4%')}
          onPress={onRemove}
        />
      )}
    </SearchItemContainer>
  );
};

export default SearchItem;
