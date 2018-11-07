import React, { PureComponent } from 'react';
import { zip } from 'rxjs';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import * as DimSize from '../common/dimensionSize';
import typeToRoutePath from '../common/typeToRoute';
import { navigate } from '../navigation';
import { getTopRatedMovies, getMoviesByGenre } from '../services';
import Podium from '../components/podium';
import Slider from '../components/Slider';
import Poster from '../components/poster';

const Title = styled.Text`
  font-size: ${DimSize.height('2.5%')};
  color: #fefefe;
  padding-top: ${DimSize.contentSidesPadding() * 2.5};
  padding-bottom: ${DimSize.contentSidesPadding() * 2.5};
  padding-left: ${DimSize.windowSidesPadding()};
`;

const View = styled.View``;

const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));

const renderPoster = movies => movies.map(item => (
  <Poster
    onPress={() => navigate(typeToRoutePath(item.type), { id: item.id })}
    key={item.id}
    url={item.posterPath}
    height={DimSize.height('32%')}
  />
));

const getMovies = list => list.map(item => (
  <View key={item.title}>
    <Title>{item.title}</Title>
    <Slider snapWidth={posterSnapWidh} items={renderPoster(item.data)} seperator />
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

    const genres = zip(getMoviesByGenre(28), getMoviesByGenre(35), getMoviesByGenre(14));
    this.genresSubscription = genres.subscribe((movies) => {
      this.cleanupSubscription('genresSubscription');
      this.setState({
        movies: movies.map(item => ({ data: item.data, title: item.title.toUpperCase() })),
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
        <Title style={{ paddingTop: 80 /* TODO */ }}>TOP 3 MOVIES</Title>
        {topRated && <Podium items={topRated} height={DimSize.height('23%')} />}
        {movies && getMovies(movies)}
      </ScreenContainer>
    );
  }
}

export default MovieScreen;
