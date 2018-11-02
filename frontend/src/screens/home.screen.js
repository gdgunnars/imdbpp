/* eslint-disable*/
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ScreenContainer from './screen.style';

import Slider from '../components/Slider';
import Poster from '../components/poster';
import Backdrop from '../components/backdrop';
import * as DimSize from '../common/dimensionSize';
import typeToRoutePath from '../common/typeToRoute';
import { getTrendingCombined } from '../services';
import { navigate } from '../navigation';

const TopRatedTitles = styled.Text`
  font-size: ${DimSize.height('2.5%')};
  color: #fefefe;
  padding-top: ${DimSize.contentSidesPadding() * 2.5};
  padding-bottom: ${DimSize.contentSidesPadding() * 2.5};
  padding-left: ${DimSize.windowSidesPadding()};
`;

const renderPoster = movies =>
  movies.map(item => (
    <Poster
      onPress={() => navigate(typeToRoutePath(item.type), { id: item.id })}
      key={item.id}
      url={item.posterPath}
      height={DimSize.height('32%')}
    />
  ));

const renderBackdrop = movies =>
  movies.map(({ id, name, score, date, backdropPath, posterPath, overview, type }) => (
    <Backdrop
      onPress={() => navigate(typeToRoutePath(type), { id })}
      key={id}
      name={name}
      score={score}
      date={date}
      backdropPath={backdropPath}
      posterPath={posterPath}
      overview={`${overview.substr(0, 100).trim()}${overview.length > 100 ? '...' : ''}`}
    />
  ));

class HomeScreen extends PureComponent {
  state = {
    trendingNow: null,
    recommended: null,
  };

  componentDidMount = async () => {
    try {
      this.subscription = getTrendingCombined();
      const data = await this.subscription.promise;
      this.setState({
        trendingNow: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount = () => {
    if (this.subscription) {
      this.subscription.cancel();
    }
  };

  render() {
    const { trendingNow, recommended } = this.state;
    const backdropSnapWidth = Math.round(DimSize.width('100%'));
    const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));
    return (
      <ScreenContainer>
        {trendingNow && (
          <Slider snapWidth={backdropSnapWidth} items={renderBackdrop(trendingNow)} />
        )}
        <TopRatedTitles>TRENDING NOW</TopRatedTitles>
        {trendingNow && (
          <Slider snapWidth={posterSnapWidh} items={renderPoster(trendingNow)} seperator />
        )}
      </ScreenContainer>
    );
  }
}

export default HomeScreen;
