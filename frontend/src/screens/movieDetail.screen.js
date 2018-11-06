import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import Trailer from '../components/trailer';
import { getMovieById } from '../services';
import * as DimSize from '../common/dimensionSize';
import dateFormat from '../common/dateFormat';
import Duration from '../components/duration';
import Genre from '../components/genre';
import Poster from '../components/poster';
import Slider from '../components/Slider';
import typeToRoutePath from '../common/typeToRoute';
import Buttons from '../components/buttons';
import { navigate } from '../navigation';

const MovieTitle = styled.Text`
  font-size: 24;
  color: #fefefe;
`;

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

const SeactionHeader = styled.Text`
  font-size: 16;
  color: #fefefe;
`;

const OverviewText = styled.Text`
  font-size: 14;
  color: #bababa;
`;

const renderCast = cast => cast.map(({ name, profilePath, id }) => (
  <Poster
    height={DimSize.height('32%')}
    key={`cast_${id}`}
    caption={name}
    url={profilePath}
    onPress={() => {}}
  />
));

const renderSimilar = tvShows => tvShows.map(item => (
  <Poster
    onPress={() => navigate(typeToRoutePath(item.type), { id: item.id })}
    key={item.id}
    url={item.posterPath}
    height={DimSize.height('32%')}
  />
));

class MovieDetailScreen extends PureComponent {
  state = {
    movie: null,
    markAsWatched: false,
    addToWatchList: false,
  };

  cleanupSubscription = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  };

  componentDidUpdate = () => {
    console.log('UPDATED');
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    if (!id) {
      console.warn('No id was provided!');
      return;
    }
    console.log(`MovieDetailScreen - getMovieById: ${id}`);
    this.subscription = getMovieById(id).subscribe((data) => {
      this.cleanupSubscription();
      this.setState({
        movie: data,
      });
    });
  };

  componentWillUnmount = () => {
    console.log('I UNMOUNTED!');
    this.cleanupSubscription();
  };

  render() {
    const { movie,  addToWatchList } = this.state;
    const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));
    if (!movie) {
      // Todo: Add preloader
      return <ScreenContainer />;
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
    } = movie;
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
          <MovieTitle>{name}</MovieTitle>
        </Row>
        <Row justifyContent="space-between">
          <Duration type={type} duration={duration} />
          <Genre type={type} text={dateFormat(date)} />
        </Row>
        <Row>
          {[
            <Genre type="movie" text="Movie" light withMargin key="genre_movie" />,
            ...genres
              .slice(0, 3)
              .sort((a, b) => (a.id || b.id > 0 || 1 ? 1 : -1))
              .map(item => <Genre text={item.name} withMargin key={`genre_${item.name}`} />),
          ]}
        </Row>
        <ButtonGroupContainer justifyContent="space-between">
          <Buttons.addToWatchList
            type={type}
            active={addToWatchList}
            size={DimSize.width('100%') - DimSize.windowSidesPadding() * 2}
            onPress={() => this.setState({ addToWatchList: !addToWatchList })}
          />
        </ButtonGroupContainer>
        <Row marginBottom="0">
          <SeactionHeader>STORYLINE</SeactionHeader>
        </Row>
        <Row>
          <OverviewText>{overview}</OverviewText>
        </Row>
        {/* Todo: Add preloader */}
        {cast && (
          <Row>
            <SeactionHeader>CAST</SeactionHeader>
          </Row>
        )}
        {cast && <Slider snapWidth={posterSnapWidh} items={renderCast(cast)} seperator />}
        {similar && (
          <Row>
            <SeactionHeader>SIMILAR MOVIES</SeactionHeader>
          </Row>
        )}
        {similar && <Slider snapWidth={posterSnapWidh} items={renderSimilar(similar)} seperator />}
      </ScreenContainer>
    );
  }
}

export default MovieDetailScreen;
