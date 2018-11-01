import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import * as DimSize from '../common/dimensionSize';
import typeToRoutePath from '../common/typeToRoute';
import { navigate } from '../navigation';
import { getTopRatedTv, getTvByGenre } from '../services';
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

const posterSnapWidh = Math.round(
  DimSize.height('32%') * 0.7 + DimSize.width('2%'),
);

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
    <Slider
      snapWidth={posterSnapWidh}
      items={renderPoster(item.data)}
      seperator
    />
  </View>
));

class TvShowScreen extends PureComponent {
  state = {
    topRated: null,
    shows: null,
  };

  componentDidMount = async () => {
    try {
      const topList = await getTopRatedTv();

      // There has to be a more cleaner way to do this..
      const dramaList = { data: await getTvByGenre(18), title: 'DRAMA' };
      const comedyList = { data: await getTvByGenre(35), title: 'COMEDY' };
      const animationList = { data: await getTvByGenre(16), title: 'ANIMATION' };
      const genres = [dramaList, comedyList, animationList];

      this.setState({
        topRated: topList,
        shows: genres,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { topRated, shows } = this.state;

    return (
      <ScreenContainer>
        <Title style={{ paddingTop: 80 /* TODO */ }}>TOP 3 SERIES</Title>
        {topRated && <Podium items={topRated} height={DimSize.height('23%')} />}
        {shows && getMovies(shows)}
      </ScreenContainer>
    );
  }
}

export default TvShowScreen;
