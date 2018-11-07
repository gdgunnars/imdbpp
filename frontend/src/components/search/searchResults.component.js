import React from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import { Icon, LinearGradient } from 'expo';
import { Header } from 'react-navigation';
import * as DimSize from '../../common/dimensionSize';
import { navigate } from '../../navigation';
import { addItemToRecentSearches } from '../../services';
import typeToRoute from '../../common/typeToRoute';
import Theme from '../../common/theme';
import Genre from '../genre';
import Slider from '../Slider';
import Poster from  '../poster';

const NothingFound = styled.Text`
  color: #fefefe;
  font-size: 18;
  text-align: center;
`;

const SearchResultWrapper = styled.View`
  margin-top: ${Header.HEIGHT + DimSize.windowSidesPadding() * 2};
  padding-top: ${DimSize.windowSidesPadding()};
  margin-left: ${DimSize.windowSidesPadding()};
  margin-right: ${DimSize.windowSidesPadding()};
`;

const gradientStyle = {
  height: DimSize.height('80%'),
  width: DimSize.width('100%'),
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  opacity: 0.55,
};

const SearchResultsContainer = styled.View`
  flex: 1;
`;

const TopResult = styled(NothingFound)`
  font-weight: bold;
`;

const KnownForTitle = styled(TopResult)`
  margin-top: ${DimSize.windowSidesPadding()};
  margin-bottom: ${DimSize.windowSidesPadding()};
`

const handleSearchItemPress = async (item) => {
  if (item.type !== 'movie' && item.type !== 'tv') {
    return;
  }
  try {
    await addItemToRecentSearches(item);
    navigate(typeToRoute(item.type), { id: item.id });
  } catch (error) {
    navigate(typeToRoute(item.type), { id: item.id });
  }
};

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
  border-radius: ${props => (props.round ? DimSize.width('20%') : 0)};
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

const capitalize = (text) => {
  const [firstLetter, ...rest] = text;
  return [firstLetter.toUpperCase(), ...rest].join('');
};

const SearchItem = ({ media }) => {
  const {
    posterPath, type, name, genres = [], id,
  } = media;
  return (
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
    </SearchItemContainer>
  );
};

const renderKnownFor = tvShows => tvShows.map(item => (
  <Poster
    onPress={() => navigate(typeToRoute(item.type), { id: item.id })}
    key={item.id}
    url={item.posterPath}
    height={DimSize.height('32%')}
  />
));

const SearchResults = (props) => {
  const { searchResults } = props;
  if (!searchResults) {
    return (
      <SearchResultsContainer>
        <SearchResultWrapper>
          <NothingFound>Nothing found..</NothingFound>
        </SearchResultWrapper>
      </SearchResultsContainer>
    );
  }
  const {
    topResult, person, movie, tv,
  } = searchResults;

  const { color = '#5CE9AC' } = topResult;
  const colors = [color, 'transparent'];
  const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));
  return (
    <SearchResultsContainer>
      <LinearGradient locations={[0.1, 1]} style={gradientStyle} colors={colors} />
      <SearchResultWrapper>
        <TopResult>Top result</TopResult>
        <SearchItem media={topResult.data} />
        {topResult.data.knownFor && <KnownForTitle>{`Featuring ${topResult.data.name}`}</KnownForTitle>}
        {topResult.data.knownFor && <Slider snapWidth={posterSnapWidh} items={renderKnownFor(topResult.data.knownFor)} seperator />}
      </SearchResultWrapper>
    </SearchResultsContainer>
  );
};

export default SearchResults;
