/* eslint-disable*/
import React, { PureComponent } from 'react';
import ScreenContainer from './screen.style';
import { Slider, Poster, Backdrop, IsConnectedToInternet } from '../components';
import { Text } from '../general';
import { getTrendingCombined, getDiscover } from '../services';
import { navigate } from '../navigation';
import { DimSize, MediaLink } from '../common';
import { NetInfo } from 'react-native';

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
        key={`backdrop${id}`}
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
    discover: null,
    isConnected: null,
  };

  cleanupSubscription = sub => {
    if (this.trendingSubscription && sub === 'trendingSubscription') {
      this.trendingSubscription.unsubscribe();
      this.trendingSubscription = null;
    }
    if (this.discoverSubscription && sub === 'discoverSubscription') {
      this.discoverSubscription.unsubscribe();
      this.discoverSubscription = null;
    }
  };

  componentDidMount = () => {
    this.trendingSubscription = getTrendingCombined().subscribe(data => {
      this.cleanupSubscription('trendingSubscription');
      this.setState({
        trendingNow: data,
      });
    });

    this.discoverSubscription = getDiscover().subscribe(data => {
      this.cleanupSubscription('discoverSubscription');
      this.setState({
        discover: data,
      });
    });

    /* Adding event listener to NetInfo */
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );

    /* Fetcing NetInfo and setting state */
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ isConnected }); }
    );

  };

  componentWillUnmount = () => {
    this.cleanupSubscription();

    /* removing event listner from NetIfno */
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );
  };

  /* Handling connection issues */
  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  };

  render() {
    console.log(this.state.isConnected);
    const { trendingNow, discover } = this.state;
    const backdropSnapWidth = Math.round(DimSize.width('100%'));
    const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));

    // Change this to === false to display homescreen.
    if (this.state.isConnected === true) {
      return (<IsConnectedToInternet />)
    }

    return (
      <ScreenContainer>
        {trendingNow && (
          <Slider snapWidth={backdropSnapWidth} items={renderBackdrop(trendingNow)} />
        )}
        {discover && <Text.subTitle>TRENDING NOW</Text.subTitle>}
        {discover && <Slider snapWidth={posterSnapWidh} items={renderPoster(discover)} seperator />}
      </ScreenContainer>
    );
  }
}

export default HomeScreen;
