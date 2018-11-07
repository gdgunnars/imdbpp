import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { FlatList } from 'react-native';
import { Header } from 'react-navigation';
import * as DimSize from '../../common/dimensionSize';
import { getRecentSearches, removeItemFromRecentSearches } from '../../services';
import { navigate } from '../../navigation';
import typeToRoute from '../../common/typeToRoute';
import Genre from '../genre';

const RecentSearchContainer = styled.View`
  margin-top: ${Header.HEIGHT + DimSize.windowSidesPadding() * 2};
  padding-top: ${DimSize.windowSidesPadding()};
  margin-left: ${DimSize.windowSidesPadding()};
  margin-right: ${DimSize.windowSidesPadding()};
`;

const RecentSearchTitle = styled.Text`
  color: #fefefe;
  font-size: 16;
  text-align: center;
  margin-bottom: ${DimSize.windowSidesPadding()};
`;

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
  margin-top: ${DimSize.width('1.5%')};
`;

const capitalize = (text) => {
  const [firstLetter, ...rest] = text;
  return [firstLetter.toUpperCase(), ...rest].join('');
};

const SearchItem = ({
  posterPath, type, name, genres, id, onRemove,
}) => (
  <SearchItemContainer>
    <SearchItemNaviagtionContainer onPress={() => navigate(typeToRoute(type), { id })}>
      {SearchItemImage[type](posterPath)}
      <SearchTextColumn>
        <SearchItemName>{name}</SearchItemName>
        <SearchItemSubTitleContainer>
          <Genre type={type} text={capitalize(type)} withMargin />
          {genres.slice(0, 2).map(item => (
            <Genre key={`genre_${item.name}`} text={item.name} withMargin />
          ))}
        </SearchItemSubTitleContainer>
      </SearchTextColumn>
    </SearchItemNaviagtionContainer>
    <Icon.EvilIcons
      name="close"
      color="#C1C1C1"
      size={DimSize.height('4%')}
      onPress={() => onRemove(id)}
    />
  </SearchItemContainer>
);

class RecentSearches extends PureComponent {
  state = {
    searches: [],
  };

  componentDidMount = () => {
    this.subscription = getRecentSearches().subscribe((searches) => {
      this.clearSubscription();
      this.setState({
        searches: [
          { id: 'flatList_title', textElement: 'Recent Searches' },
          ...searches,
          { id: 'Please_fix_this', textElement: ' ' },
        ].map(elem => ({ ...elem, id: elem.id.toString() })),
      });
    });
  };

  componentWillUnmount = () => {
    this.clearSubscription();
  };

  onReomve = (id) => {
    removeItemFromRecentSearches(id).then(() => {
      const { searches } = this.state;
      const clonedSearches = [...searches];
      this.setState({
        searches: clonedSearches.filter(item => item.id !== id.toString()),
      });
    });
  };

  clearSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  render() {
    const { searches } = this.state;
    return (
      <RecentSearchContainer>
        <FlatList
          keyExtractor={item => item.id}
          data={searches}
          title="Recent Searches"
          renderItem={({ item }) => {
            if (item.textElement) {
              return <RecentSearchTitle key={item.id}>{item.textElement}</RecentSearchTitle>;
            }
            const {
              posterPath, type, name, genres, id,
            } = item;
            return (
              <SearchItem
                key={id}
                id={id}
                posterPath={posterPath}
                type={type}
                name={name}
                genres={genres}
                onRemove={this.onReomve}
              />
            );
          }}
        />
      </RecentSearchContainer>
    );
  }
}

export default RecentSearches;
