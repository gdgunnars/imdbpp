import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import {
  Profile, Slider, Poster, Buttons,
} from '../components';
import ToggleShowMore from '../components/toggleShowMore';
import { getPersonById } from '../services';
import { Text } from '../general';
import { DimSize, MediaLink, RandBetween } from '../common';
import { navigate } from '../navigation';

const Row = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${DimSize.height('1%')};
  margin-bottom: ${props => props.marginBottom || DimSize.height('1%')};
  align-items: center;
`;

const renderPoster = (media, caption = false) => media.map((item) => {
  const link = () => navigate(MediaLink(item));
  const cap = caption ? item.name : null;
  return (
    <Poster
      caption={cap}
      onPress={link}
      key={`${item.type}${item.id}`}
      url={item.posterPath}
      height={DimSize.height('32%')}
    />
  );
});

const getBackdropImage = (pool) => {
  let path = '';
  const elem = pool.movies.length > pool.tvShows.length ? 'movies' : 'tvShows';
  while (!path || path === '') {
    const randHigh = pool[elem].length - 1;
    const chosenElem = pool[elem][RandBetween(0, randHigh)];
    const { backdropPath } = chosenElem;
    path = backdropPath;
  }
  return path;
};

class PersonDetailScreen extends PureComponent {
  backdropPath = '';
  state = {
    media: null,
    toggleMoreText: false,
  };

  cleanupSubscription = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    const mediaData = navigation.getParam('data');
    if (!mediaData) {
      console.warn('No id was provided!');
      return;
    }

    const { id } = mediaData;

    this.subscription = getPersonById(id).subscribe((media) => {
      this.cleanupSubscription();
      this.backdropPath = getBackdropImage({ tvShows: media.tvShows, movies: media.movies });
      this.setState({
        media,
      });
    });
  };

  componentWillUnmount = () => {
    this.cleanupSubscription();
  };

  toggleMoreText = () => {
    this.setState(prev => ({ toggleMoreText: !prev.toggleMoreText }));
  };

  render() {
    const { media, toggleMoreText } = this.state;
    const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));
    if (!media) {
      // Todo: Add preloader
      return <ScreenContainer />;
    }
    const {
      name, posterPath, biography, knownForDepartment, tvShows, movies,
    } = media;
    const backPoster = movies[0].posterPath || tvShows[0].posterPath;
    return (
      <ScreenContainer>
        <Profile
          backdropPath={backPoster}
          posterPath={posterPath}
          name={name}
          role={knownForDepartment}
        />
        <Row>
          <Text.subTitle>Biography</Text.subTitle>
        </Row>
        <ToggleShowMore text={biography} active={toggleMoreText} />
        <Row justifyContent="center">
          <Buttons.showMore onPress={() => this.toggleMoreText()} active={toggleMoreText} />
        </Row>
        <Row>
          <Text.subTitle>Movies</Text.subTitle>
        </Row>
        <Slider snapWidth={posterSnapWidh} items={renderPoster(movies)} seperator />
        <Row>
          <Text.subTitle>Tv Shows</Text.subTitle>
        </Row>
        <Slider snapWidth={posterSnapWidh} items={renderPoster(tvShows)} seperator />
      </ScreenContainer>
    );
  }
}

export default PersonDetailScreen;
