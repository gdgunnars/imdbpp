import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ScreenContainer from './screen.style';
import Trailer from '../components/trailer';
import { getMovieById } from '../services';
import * as DimSize from '../common/dimensionSize';
import dateFormat from '../common/dateFormat';
import Duration from '../components/duration';
import Genre from '../components/genre';
import Buttons from '../components/buttons';
// import Rating from '../components/rating';

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

/*eslint-disable */
class MovieDetailScreen extends PureComponent {
  state = {
    markAsWatched: false,
    addToWatchList: false,
  };
  render() {
    const { markAsWatched, addToWatchList } = this.state;

    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const movie = getMovieById(id);
    const { name, score, date, backdropPath, overview, trailer, genres } = movie;
    return (
      <ScreenContainer>
        <Trailer
          src={trailer}
          poster={backdropPath}
          height={DimSize.height('38%')}
          width={DimSize.width('100%')}
        />
        <Row>
          <MovieTitle>{name}</MovieTitle>
        </Row>
        <Row justifyContent="space-between">
          <Duration duration="2h 20min" />
          <Genre text={dateFormat(date)} light />
        </Row>
        <Row>
          {[
            <Genre text="Movie" light withMargin key="genre_movie" />,
            ...genres
              .slice(0, 4)
              .map(({ name }) => <Genre text={name} withMargin key={`genre_${name}`} />),
          ]}
        </Row>
        <ButtonGroupContainer justifyContent="space-between">
          <Buttons.markAsWatched
            active={markAsWatched}
            size={DimSize.width('48%') - DimSize.windowSidesPadding()}
            onPress={() => this.setState({ markAsWatched: !markAsWatched })}
          />
          <Buttons.addToWatchList
            active={addToWatchList}
            size={DimSize.width('48%') - DimSize.windowSidesPadding()}
            onPress={() => this.setState({ addToWatchList: !addToWatchList })}
          />
        </ButtonGroupContainer>
        <Row marginBottom="0">
          <SeactionHeader>STORYLINE</SeactionHeader>
        </Row>
        <Row>
          <OverviewText>{overview}</OverviewText>
        </Row>

        <Row>
          <SeactionHeader>CAST</SeactionHeader>
        </Row>
        <Row>
          <SeactionHeader>SIMILAR MOVIES</SeactionHeader>
        </Row>
      </ScreenContainer>
    );
  }
}

export default MovieDetailScreen;
