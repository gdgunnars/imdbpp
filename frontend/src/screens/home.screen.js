/* eslint-disable*/
import React, { PureComponent } from 'react';
import ScreenContainer from './screen.style';
import { Slider, Poster, Backdrop, Loading } from '../components';
import { Text } from '../general';
import { getTrendingCombined } from '../services';
import { navigate } from '../navigation';
import { DimSize, MediaLink } from '../common';

const renderPoster = movies =>
  movies.map(item => (
    <Poster
      onPress={() => navigate(MediaLink(item))}
      key={item.id}
      url={item.posterPath}
      height={DimSize.height('32%')}
    />
  ));

const renderBackdrop = movies =>
  movies.map(item => {
    const { id, name, score, date, backdropPath, posterPath, overview } = item;
    const link = () => navigate(MediaLink(item));
    return (
      <Backdrop
        onPress={link}
        key={id}
        name={name}
        score={score}
        date={date}
        backdropPath={backdropPath}
        posterPath={posterPath}
        overview={`${overview.substr(0, 100).trim()}${overview.length > 100 ? '...' : ''}`}
      />
    );
  });

class HomeScreen extends PureComponent {
  state = {
    trendingNow: null,
    recommended: null,
  };

  cleanupSubscription = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  };

  componentDidMount = () => {
    this.subscription = getTrendingCombined().subscribe(data => {
      this.cleanupSubscription();
      this.setState({
        trendingNow: data,
      });
    });
  };

  componentWillUnmount = () => {
    this.cleanupSubscription();
  };

  render() {
    const { trendingNow, recommended, loading } = this.state;
    const backdropSnapWidth = Math.round(DimSize.width('100%'));
    const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));

    return (
      <ScreenContainer>
        <Loading isLoading={!trendingNow} delay={500} />
        {trendingNow && (
          <Slider snapWidth={backdropSnapWidth} items={renderBackdrop(trendingNow)} />
        )}
        <Text.subTitle>TRENDING NOW</Text.subTitle>
        {trendingNow && (
          <Slider snapWidth={posterSnapWidh} items={renderPoster(trendingNow)} seperator />
        )}
      </ScreenContainer>
    );
  }
}

export default HomeScreen;
