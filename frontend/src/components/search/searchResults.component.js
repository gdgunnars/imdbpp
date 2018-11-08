import React from 'react';
import styled from 'styled-components';
import { LinearGradient } from 'expo';
import { Header } from 'react-navigation';
import { DimSize, MediaLink, Theme } from '../../common';
import { navigate } from '../../navigation';
import Slider from '../Slider';
import Poster from '../poster';
import SearchItem from './searchItem.component';
import { addItemToRecentSearches } from '../../services';
import { View } from '../../general';

const NothingFound = styled.Text`
  color: #fefefe;
  font-size: 18;
  text-align: center;
`;

const SearchResultWrapper = styled.ScrollView`
  margin-top: ${Theme.sizes.statusBar.height + Theme.sizes.navBar.height};
  margin-left: ${DimSize.windowSidesPadding()};
  margin-right: ${DimSize.windowSidesPadding()};
  padding-bottom: ${Theme.sizes.spaces.content.large.bottom};  
`;

const gradientStyle = {
  height: DimSize.height('80%'),
  width: DimSize.width('100%'),
  opacity: 0.7,
};

const LastItem = styled.View`
  margin-bottom: ${Theme.sizes.spaces.content.large.bottom};
`

const SectionView = styled.View`
  margin-top: ${Theme.sizes.spaces.content.large.top};
`;

const SearchResultsContainer = styled.View`
  flex: 1;
`;

const TopResult = styled(NothingFound)`
  font-weight: bold;
  padding-top: ${Theme.sizes.spaces.content.large.top};
`;

const SubTitle = styled(NothingFound)`
  font-weight: bold;
  margin-top: ${Theme.sizes.spaces.content.medium.top};
  margin-bottom: ${Theme.sizes.spaces.content.small.bottom};
`;

const MirrorScroll = styled.ScrollView`
  height: ${Theme.sizes.window.height * 2};
`;

const MirrorScrollAbsoluteWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const createSearchResItemLink = (item) => {
  const Link = async () => {
    try {
      await addItemToRecentSearches(item);
      navigate(MediaLink(item));
    } catch (error) {
      console.log(error);
      navigate(MediaLink(item));
    }
  };
  return Link;
};

const renderKnownFor = tvShows => tvShows.map((item) => {
  const link = createSearchResItemLink(item);
  return (
    <Poster onPress={link} key={item.id} url={item.posterPath} height={DimSize.height('32%')} />
  );
});

const renderOtherContent = list => list
  .sort((a, b) => (a.data.popularity > b.popularity ? -1 : 1))
  .filter(item => item.data.length > 0)
  .map(item => (
    <SectionView key={item.subTitle}>
      <SubTitle>{item.subTitle}</SubTitle>
      {item.data.map((innerItem) => {
        const link = createSearchResItemLink(innerItem);
        return <SearchItem key={innerItem.id} media={innerItem} onPress={link} />;
      })}
    </SectionView>
  ));

const FillContent = styled.View``;

class SearchResults extends React.PureComponent {
  mirrorScrollRef = React.createRef();

  state = {
    mirrorScrollHeight: 0,
  };

  setScrollViewHeight = (event) => {
    const { height } = event.nativeEvent.layout;
    const { mirrorScrollHeight } = this.state;
    console.log('HEIGHT: ', mirrorScrollHeight);
    console.log('containerHeiught: ', height);
    this.setState({
      mirrorScrollHeight: height,
    });
  };

  handleScrollViewScroll = (event) => {
    const {y} = event.nativeEvent.contentOffset;
    this.mirrorScrollRef.current.scrollTo({y});
  };

  render() {
    const { searchResults } = this.props;
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
    const { mirrorScrollHeight } = this.state;
    const colors = [color, 'transparent'];
    const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));
    const TopResLink = createSearchResItemLink(topResult.data);

    return (
      <SearchResultsContainer>
        <MirrorScrollAbsoluteWrapper>
          <MirrorScroll ref={this.mirrorScrollRef} style={{ height: mirrorScrollHeight }} scrollEnabled={false}>
            <LinearGradient locations={[0.1, 1]} style={gradientStyle} colors={colors} />
            <FillContent style={{ height: mirrorScrollHeight * 2}} />
          </MirrorScroll>
        </MirrorScrollAbsoluteWrapper>
        <SearchResultWrapper
          showsVerticalScrollIndicator={false}
          onScroll={this.handleScrollViewScroll}
          onLayout={this.setScrollViewHeight}
        >
          <TopResult>Top result</TopResult>
          <SearchItem media={topResult.data} onPress={TopResLink} />
          {topResult.data.knownFor && <SubTitle>{`Featuring ${topResult.data.name}`}</SubTitle>}
          {topResult.data.knownFor && (
            <Slider
              snapWidth={posterSnapWidh}
              items={renderKnownFor(topResult.data.knownFor)}
              seperator
            />
          )}
          {renderOtherContent([
            { subTitle: 'People', data: person.data },
            { subTitle: 'Movies', data: movie.data },
            { subTitle: 'Tv-Shows', data: tv.data },
          ])}
          <LastItem />
        </SearchResultWrapper>
      </SearchResultsContainer>
    );
  }
}

export default SearchResults;
