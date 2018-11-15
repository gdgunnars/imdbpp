import React, { PureComponent } from 'react';
import { zip } from 'rxjs';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import { navigate } from '../navigation';
import { DimSize, MediaLink, Theme } from '../common';
import { getTopRatedTv, getTvByGenre } from '../services';
import {
  Podium, Slider, Poster, Loading,
} from '../components';
import { Text } from '../general';

const View = styled.View``;

const TvShwoContainer = styled.View`
  margin-top: ${Theme.sizes.spaces.content.large.top};
  margin-bottom: ${Theme.sizes.spaces.content.large.bottom};
`;

const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));

const renderPoster = movies => movies.map((item) => {
  const link = () => navigate(MediaLink(item));

  return (
    <Poster
      onPress={link}
      key={`${item.type}${item.genres[0]}${item.id}`}
      url={item.posterPath}
      height={DimSize.height('32%')}
    />
  );
});

const getMovies = list => list.map(item => (
  <View key={item.title}>
    <Text.subTitle>{item.title}</Text.subTitle>
    <Slider snapWidth={posterSnapWidh} items={renderPoster(item.data)} seperator />
  </View>
));

class TvShowScreen extends PureComponent {
  state = {
    topRated: null,
    shows: null,
  };

  cleanupSubscription = (key) => {
    if (this[key]) {
      this[key].unsubscribe();
      this[key] = null;
    }
  };

  componentDidMount = () => {
    this.topRatedSubscription = getTopRatedTv().subscribe((topRated) => {
      this.cleanupSubscription('topRatedSubscription');
      this.setState({
        topRated,
      });
    });

    const genres = zip(getTvByGenre(18), getTvByGenre(35), getTvByGenre(99), getTvByGenre(16));
    this.genresSubscription = genres.subscribe((shows) => {
      this.cleanupSubscription('genresSubscription');
      this.setState({
        shows,
      });
    });
  };

  componentWillUnmount = () => {
    this.cleanupSubscription('genresSubscription');
    this.cleanupSubscription('topRatedSubscription');
  };

  render() {
    const { topRated, shows } = this.state;

    return (
      <ScreenContainer>
        <TvShwoContainer>
          {topRated && <Podium items={topRated} height={DimSize.height('23%')} />}
          {shows && getMovies(shows)}
        </TvShwoContainer>
      </ScreenContainer>
    );
  }
}

export default TvShowScreen;
