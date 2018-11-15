import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import { Profile, KnownFor, Relations, Slider, Poster } from '../components'
import { getMovieById, getTvShowById } from '../services';
import { Text } from '../general';
import { DimSize } from '../common';

const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent || 'flex-start'};
  padding-left: ${DimSize.windowSidesPadding()};
  padding-right: ${DimSize.windowSidesPadding()};
  margin-top: ${DimSize.height('1%')};
  margin-bottom: ${props => props.marginBottom || DimSize.height('1%')};
  align-items: center;
`;

const renderPoster = (media, caption = false) => media.map((item) => {
  const link = () => navigate(MediaLink(item));
  const cap = caption ? item.name : null;
  return (
    <Poster caption={cap} onPress={link} key={item.id} url={item.posterPath} height={DimSize.height('32%')} />
  );
});


const getSubscription = (type) => {
  if (type === 'tv') {
    return getTvShowById;
  }
  return getMovieById;
};

class PersonDetailScreen extends PureComponent {
  state = {
    media: null,
  };

  cleanupSubscription = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    if (this.addRemoveSubscription) {
      this.addRemoveSubscription.unsubscribe();
      this.addRemoveSubscription = null;
    }
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    const mediaData = navigation.getParam('data');
    if (!mediaData) {
      console.warn('No id was provided!');
      return;
    }
    const { id, type } = mediaData;

    this.subscription = getSubscription(type)(id).subscribe((media) => {
      this.cleanupSubscription();
      this.setState({
        media,
      });
    });
  };

  componentWillUnmount = () => {
    console.log('I UNMOUNTED!');
    this.cleanupSubscription();
  };

  render() {
    const { media } = this.state;
    const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));
    if (!media) {
      // Todo: Add preloader
      return <ScreenContainer />;
    }
    // console.log(media);
    const {
      name = name ? name : 'Ryan Reynolds',
      role = role ? role : 'Actor',
      score,
      date,
      backdropPath,
      overview,
      trailer,
      genres,
      cast,
      similar,
      duration,
      type,
      onWatchList,
      posterPath,
    } = media;
    return <ScreenContainer>
      <Profile backdroPath={backdropPath} posterPath={posterPath} name={name} role={role} />
      <Row>
        <Text.subTitle>Known For</Text.subTitle>
      </Row>
      <Slider snapWidth={posterSnapWidh} items={renderPoster(cast, true)} seperator />
      <Row>
        <Text.subTitle>Kevin Bacon Effect</Text.subTitle>
      </Row>
      <Slider snapWidth={posterSnapWidh} items={renderPoster(similar)} seperator />
    </ScreenContainer>;
  }
}

export default PersonDetailScreen;
