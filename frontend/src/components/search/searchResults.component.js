import React from 'react';
import styled from 'styled-components';
import { LinearGradient } from 'expo';
import { Header } from 'react-navigation';
import { DimSize, MediaLink } from '../../common';
import { navigate } from '../../navigation';
import Slider from '../Slider';
import Poster from '../poster';
import SearchItem from './searchItem.component';

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
`;

const renderKnownFor = tvShows => tvShows.map((item) => {
  const link = () => navigate(MediaLink(item));
  return (
    <Poster onPress={link} key={item.id} url={item.posterPath} height={DimSize.height('32%')} />
  );
});

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
        {topResult.data.knownFor && (
          <KnownForTitle>{`Featuring ${topResult.data.name}`}</KnownForTitle>
        )}
        {topResult.data.knownFor && (
          <Slider
            snapWidth={posterSnapWidh}
            items={renderKnownFor(topResult.data.knownFor)}
            seperator
          />
        )}
      </SearchResultWrapper>
    </SearchResultsContainer>
  );
};

export default SearchResults;
