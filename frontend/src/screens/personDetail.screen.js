import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import {
  Profile, Slider, Poster, Buttons,
} from '../components';
import ToggleShowMore from '../components/toggleShowMore';
import { getPersonById } from '../services';
import { Text } from '../general';
import {
  DimSize, MediaLink, RandBetween, Theme,
} from '../common';
import { navigate } from '../navigation';

const Row = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => props.marginBottom || DimSize.height('1%')};
  align-items: center;
`;

const LastItem = styled.View`
  margin-bottom: ${Theme.sizes.spaces.content.large.bottom};
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

const getSafeBackdropImage = ({ tvShows, movies }) => {
  const arr = tvShows.length > movies.length ? tvShows : movies;
  const backdropPool = arr.filter(item => item.backdropPath);
  if (backdropPool.length === 1) {
    return backdropPool[0].backdropPath;
  }
  if (backdropPool.length > 1) {
    return backdropPool[RandBetween(0, backdropPool.length - 1)].backdropPath;
  }
  return '';
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
      this.backdropPath = getSafeBackdropImage({ tvShows: media.tvShows, movies: media.movies });
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
    return (
      <ScreenContainer>
        <Profile
          backdropPath={this.backdropPath}
          posterPath={posterPath}
          name={name}
          role={knownForDepartment}
        />
        <Row>
          <Text.subTitle>Biography</Text.subTitle>
        </Row>
        <ToggleShowMore text={biography} active={toggleMoreText} />
        <Row justifyContent="center">
          {biography && (
            <Buttons.showMore onPress={() => this.toggleMoreText()} active={toggleMoreText} />
          )}
        </Row>
        <Row>{movies && movies[0] && <Text.subTitle>Movies</Text.subTitle>}</Row>
        {movies && <Slider snapWidth={posterSnapWidh} items={renderPoster(movies)} seperator />}
        <Row>{tvShows && tvShows[0] && <Text.subTitle>Tv Shows</Text.subTitle>}</Row>
        {tvShows && tvShows[0] && (
          <Slider snapWidth={posterSnapWidh} items={renderPoster(tvShows)} seperator />
        )}
        <LastItem />
      </ScreenContainer>
    );
  }
}

export default PersonDetailScreen;
