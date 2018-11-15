import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import {
  Profile, Biography, Slider, Poster, Buttons,
} from '../components';
import { getPersonById } from '../services';
import { Text } from '../general';
import { DimSize, MediaLink } from '../common';
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
      key={item.id}
      url={item.posterPath}
      height={DimSize.height('32%')}
    />
  );
});

class PersonDetailScreen extends PureComponent {
  state = {
    media: null,
    showMoreBio: false,
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

    const { id = 500 } = mediaData;

    this.subscription = getPersonById(id).subscribe((media) => {
      this.cleanupSubscription();
      this.setState({
        media,
      });
    });
  };

  componentWillUnmount = () => {
    this.cleanupSubscription();
  };

  toggleBioSize = () => {
    this.setState(prev => ({ showMoreBio: !prev.showMoreBio }));
  };

  render() {
    const { media, showMoreBio } = this.state;
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
          backdropPath={posterPath}
          posterPath={posterPath}
          name={name}
          role={knownForDepartment}
        />
        <Row>
          <Text.subTitle>Biography</Text.subTitle>
        </Row>
        <Biography bio={biography} active={showMoreBio} />
        <Row justifyContent="center">
          <Buttons.showMore onPress={() => this.toggleBioSize()} active={showMoreBio} />
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
