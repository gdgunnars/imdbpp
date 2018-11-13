import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import { getMovieById, getTvShowById, toggleItemToWatchList } from '../services';
import { navigate } from '../navigation';
import { Text } from '../general';

import {
  Trailer, Duration, Genre, Poster, Slider, Buttons, Loading,
} from '../components';
import {
  DimSize, DateFormat, Capitalize, MediaLink,
} from '../common';

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

const ButtonGroupContainer = styled(Row)`
  margin-top: ${DimSize.height('2%')};
  margin-bottom: ${DimSize.height('2%')};
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



class MovieTvDetail extends PureComponent {
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

  addRemoveFromWatchList = () => {
    const { media } = this.state;
    this.addRemoveSubscription = toggleItemToWatchList(media).subscribe((newMedia) => {
      this.cleanupSubscription();
      this.setState({
        media: newMedia,
      });
    });
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const mediaData = navigation.getParam('data') || { id: 1420, type: 'tv' };

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
      return <ScreenContainer><Loading isLoading /></ScreenContainer>;
    }

    const {
      name,
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
    } = media;
    return (
      <ScreenContainer>
        <Trailer
          score={score}
          src={trailer}
          poster={backdropPath}
          height={DimSize.height('38%')}
          width={DimSize.width('100%')}
        />
        <Row>
          <Text.huge>{name}</Text.huge>
        </Row>
        <Row justifyContent="space-between">
          <Duration type={type} duration={duration} />
          <Genre type={type} text={DateFormat(date)} />
        </Row>
        <Row>
          {[
            <Genre type={type} text={Capitalize(type)} light withMargin key={`genre_${type}`} />,
            ...genres
              .slice(0, 3)
              .sort((a, b) => (a.id || b.id > 0 || 1 ? 1 : -1))
              .map(item => <Genre text={item.name} withMargin key={`genre_${item.name}`} />),
          ]}
        </Row>
        <ButtonGroupContainer justifyContent="space-between">
          <Buttons.addToWatchList
            active={onWatchList}
            type={type}
            size={DimSize.width('100%') - DimSize.windowSidesPadding() * 2}
            onPress={this.addRemoveFromWatchList}
          />
        </ButtonGroupContainer>
        <Text.subTitle>StoryLine</Text.subTitle>
        <Row>
          <Text.body1>{overview}</Text.body1>
        </Row>
        {/* Todo: Add preloader */}
        {cast && <Text.subTitle>Cast</Text.subTitle>}
        {cast && <Slider snapWidth={posterSnapWidh} items={renderPoster(cast, true)} seperator />}
        {similar && (
          <Text.subTitle>{`similar ${type === 'tv' ? 'tv-shows' : 'movies'}`}</Text.subTitle>
        )}
        {similar && <Slider snapWidth={posterSnapWidh} items={renderPoster(similar)} seperator />}
      </ScreenContainer>
    );
  }
}

export default MovieTvDetail;
