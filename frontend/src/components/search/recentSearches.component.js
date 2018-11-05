import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { FlatList } from 'react-native';
import * as DimSize from '../../common/dimensionSize';
import { getRecentSearches } from '../../services';
import { navigate } from '../../navigation';
import typeToRoute from '../../common/typeToRoute';

const RecentSearchContainer = styled.View`
  padding-top: ${DimSize.windowSidesPadding()};
  margin-left: ${DimSize.windowSidesPadding()};
  margin-right: ${DimSize.windowSidesPadding()};
  flex: 1;
`;

const FlatListContainer = styled.View``;

const RecentSearchTitle = styled.Text`
  color: #fefefe;
  font-size: 16;
  text-align: center;
`;

const SearchItemContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  margin-top: ${DimSize.windowSidesPadding()};
  margin-top: ${DimSize.windowSidesPadding()};
  align-items: center;
`;

const SearchImageStyle = styled.Image`
  width: ${DimSize.width('20%')};
  height: ${DimSize.width('20%')};
  border-radius: ${props => (props.round ? DimSize.width('12%') : 0)};
`;

const SearchItemImage = {
  tv: url => <SearchImageStyle source={{ uri: url }} resizeMode="cover" />,
  movie: url => <SearchImageStyle source={{ uri: url }} resizeMode="cover" />,
  person: url => <SearchImageStyle source={{ uri: url }} resizeMode="cover" />,
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
`;

const SearchItemSubTitle = styled.Text`
  font-size: 14;
  color: #c1c1c1;
`;

const capitalize = (text) => {
  const [firstLetter, ...rest] = text;
  return [firstLetter.toUpperCase(), ...rest].join('');
};

const joinGenres = genres => genres.slice(0, 2).reduce((prev, curr) => `${prev !== '' ? `${prev} |` : prev} ${curr.name}`, '');

const SearchItem = ({
  posterPath, type, name, genres, id,
}) => (
  <SearchItemContainer onPress={() => navigate(typeToRoute(type), { id })}>
    {SearchItemImage[type](posterPath)}
    <SearchTextColumn>
      <SearchItemName>{name}</SearchItemName>
      <SearchItemSubTitleContainer>
        <SearchItemSubTitle>{capitalize(type)}</SearchItemSubTitle>
        <SearchItemSubTitle> &#8226; </SearchItemSubTitle>
        <SearchItemSubTitle>{joinGenres(genres)}</SearchItemSubTitle>
      </SearchItemSubTitleContainer>
    </SearchTextColumn>
    <Icon.EvilIcons name="close" color="#C1C1C1" size={DimSize.height('4%')} />
  </SearchItemContainer>
);

class RecentSearches extends PureComponent {
  state = {
    searches: [],
  };

  componentDidMount = () => {
    this.subscription = getRecentSearches().subscribe((searches) => {
      this.setState({
        searches,
      });
    });
  };

  render() {
    const { searches } = this.state;
    const withTitle = ['Recent Searches', ...searches, ' '];
    return (
      <RecentSearchContainer>
        <FlatList
          keyExtractor={item => (item.id ? item.id.toString() : `flatListItem_${item}`)}
          data={withTitle}
          title="Recent Searches"
          renderItem={({ item }) => {
            if (typeof item === 'string') {
              return <RecentSearchTitle>{item}</RecentSearchTitle>;
            }
            const {
              posterPath, type, name, genres, id,
            } = item;
            return (
              <SearchItem id={id} posterPath={posterPath} type={type} name={name} genres={genres} />
            );
          }}
        />
      </RecentSearchContainer>
    );
  }
}

export default RecentSearches;
