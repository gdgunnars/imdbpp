import React, { PureComponent } from 'react';
import { zip } from 'rxjs';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import { navigate } from '../navigation';
import { getTopRatedMovies, getMoviesByGenre } from '../services';
import { DimSize, MediaLink, Theme } from '../common';
import {
  Podium, Slider, Poster,
} from '../components';

import { Text } from '../general';

const View = styled.View``;

const MovieContainer = styled.View`
  position: relative;
  margin-top: ${Theme.sizes.spaces.content.large.top};
  margin-bottom: ${Theme.sizes.spaces.content.large.bottom};
`;

const posterSnapWidh = Math.round(
  DimSize.height('32%') * 0.7 + DimSize.width('2%'),
);

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
    <Slider
      snapWidth={posterSnapWidh}
      items={renderPoster(item.data)}
      seperator
    />
  </View>
));

class MovieScreen extends PureComponent {
  state = {
    topRated: null,
    movies: null,
  };

  cleanupSubscription = (key) => {
    if (this[key]) {
      this[key].unsubscribe();
      this[key] = null;
    }
  };

  componentDidMount = () => {
    this.topRatedSubscription = getTopRatedMovies().subscribe((topRated) => {
      this.cleanupSubscription('topRatedSubscription');
      this.setState({
        topRated,
      });
    });

    const genres = zip(
      getMoviesByGenre(28),
      getMoviesByGenre(35),
      getMoviesByGenre(14),
      getMoviesByGenre(27),
    );
    this.genresSubscription = genres.subscribe((movies) => {
      this.cleanupSubscription('genresSubscription');
      this.setState({
        movies,
      });
    });
  };

  componentWillUnmount = () => {
    this.cleanupSubscription('genresSubscription');
    this.cleanupSubscription('topRatedSubscription');
  };

  render() {
    const { topRated, movies } = this.state;

    return (
      <ScreenContainer>
        <MovieContainer>
          {topRated && (
            <Podium items={topRated} height={DimSize.height('23%')} />
          )}
          {movies && getMovies(movies)}
        </MovieContainer>
      </ScreenContainer>
    );
  }
}

export default MovieScreen;
