import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as Style from './screen.style';

import Slider from '../components/Slider';
import Poster from '../components/poster';
import Backdrop from '../components/backdrop';
import * as DimSize from '../common/dimensionSize';
import { getAllMovies } from '../dummyData';

const TopRatedTitles = styled.Text`
  font-size: ${DimSize.height('2.5%')};
  color: #fefefe;
  padding-top: ${DimSize.contentSidesPadding() * 2.5};
  padding-bottom: ${DimSize.contentSidesPadding() * 2.5};
  padding-left: ${DimSize.windowSidesPadding()};
`;

const getTrendingMovies = () => {
  const movies = getAllMovies();
  return movies
    .slice(0, 11)
    .map(item => <Poster key={item.id} url={item.poster_path} height={DimSize.height('32%')} />);
};
/*eslint-disable */
const getTopMovies = () => {
  const movies = getAllMovies();
  return movies
    .slice(11, 20)
    .map(({ id, name, score, date, backdrop_path, poster_path, overview }) => (
      <Backdrop
        key={id}
        name={name}
        score={score}
        date={date}
        backdrop_path={backdrop_path}
        poster_path={poster_path}
        overview={`${overview.substr(0, 100).trim()}${overview.length > 100 ? '...' : ''}`}
      />
    ));
};

class HomeScreen extends PureComponent {
  static navigationOptions = {
    title: '',
    ...Style.NavigationStyle,
  };

  render() {
    return (
      <Style.ScreenContainer>
        <Slider snapWidth={DimSize.width('100%')} items={getTopMovies()} />
        <TopRatedTitles>TOP RATED TITLES</TopRatedTitles>
        <Slider
          snapWidth={DimSize.width('32%') * 0.7 * DimSize.width('2%')}
          items={getTrendingMovies()}
          seperator
        />
      </Style.ScreenContainer>
    );
  }
}

export default HomeScreen;
