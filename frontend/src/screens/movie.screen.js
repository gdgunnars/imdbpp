import React, { PureComponent } from 'react';
import { zip } from 'rxjs';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import { navigate } from '../navigation';
import { getTopRatedMovies, getMoviesByGenre } from '../services';
import { DimSize, MediaLink, Theme } from '../common';
import {
  Podium, Slider, Poster, Loading,
} from '../components';

import { Text } from '../general';

const View = styled.View``;

const MovieContainer = styled.View`
  position: relative;
  margin-top: ${Theme.sizes.spaces.content.large.top};
  margin-bottom: ${Theme.sizes.spaces.content.large.bottom};
`;

const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));

const renderPoster = movies => movies.map((item) => {
  const link = () => navigate(MediaLink(item));
  return (
    <Poster onPress={link} key={item.id} url={item.posterPath} height={DimSize.height('32%')} />
  );
});

const getMovies = list => list.map(item => (
  <View key={item.title}>
    <Text.subTitle>{item.title}</Text.subTitle>
    <Slider snapWidth={posterSnapWidh} items={renderPoster(item.data)} seperator />
  </View>
));

class MovieScreen extends PureComponent {
  state = {
    topRated: null,
    movies: null,
    loading: false,
  };

  cleanupSubscription = (key) => {
    if (this[key]) {
      this[key].unsubscribe();
      this[key] = null;
    }
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    this.topRatedSubscription = getTopRatedMovies().subscribe((topRated) => {
      this.cleanupSubscription('topRatedSubscription');
      this.setState({
        topRated,
      });
    });

    const genres = zip(getMoviesByGenre(28), getMoviesByGenre(35), getMoviesByGenre(14));
    this.genresSubscription = genres.subscribe((movies) => {
      this.cleanupSubscription('genresSubscription');
      this.setState({
        movies,
        loading: false,
      });
    });
  };

  componentWillUnmount = () => {
    this.cleanupSubscription('genresSubscription');
    this.cleanupSubscription('topRatedSubscription');
  };

  render() {
    const { topRated, movies, loading } = this.state;

    return (
      <ScreenContainer>
        <MovieContainer>
          <Loading isLoading={loading} screenHasNavbar />
          {topRated && <Podium items={topRated} height={DimSize.height('23%')} />}
          {movies && getMovies(movies)}
        </MovieContainer>
      </ScreenContainer>
    );
  }
}

export default MovieScreen;
