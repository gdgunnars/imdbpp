import React, { PureComponent } from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import ScreenContainer from './screen.style';
import Trailer from '../components/trailer';
import { getTvShowById, fetchTvShowById } from '../services';
import * as DimSize from '../common/dimensionSize';
import dateFormat from '../common/dateFormat';
import Duration from '../components/duration';
import Genre from '../components/genre';
import Poster from '../components/poster';
import Slider from '../components/Slider';
// import Rating from '../components/rating';
import typeToRoutePath from '../common/typeToRoute';

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

const renderSimilar = (tvShows, navigation) => tvShows.map(item => (
  <Poster
    onPress={() => navigation.push(typeToRoutePath(item.type), { id: item.id })}
    key={item.id}
    url={item.posterPath}
    height={DimSize.height('32%')}
  />
));

/*eslint-disable */
class TvShowDetailScreen extends PureComponent {
  state = {
    tvShow: getTvShowById(this.props.navigation.getParam('id')),
  };

  componentDidMount = async () => {
    const { tvShow } = this.state;
    const { trailer, createdBy, id } = tvShow;
    // Todo: We need to cancel this async call if the component unmounts before finishing.
    if (!trailer && !createdBy) {
      const fetchedTvShow = await fetchTvShowById(id);
      this.setState({
        tvShow: fetchedTvShow,
      });
    }
  };

  componentWillUnmount = () => {
    console.log('unmounted!');
  }

  render() {
    const { tvShow } = this.state;
    const {navigation} = this.props;
    const { name, score, date, backdropPath, overview, trailer, genres, cast, similar } = tvShow;
    const posterSnapWidh = Math.round(DimSize.height('32%') * 0.7 + DimSize.width('2%'));

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
              .sort((a,b) => a.id < b.id ? 1 : -1)
              .map(({ name }) => <Genre text={name} withMargin key={`genre_${name}`} />),
          ]}
        </Row>
        {/* <Row justifyContent="space-between" />  Adding buttons here later*/}
        <Row marginBottom="0">
          <SeactionHeader>STORYLINE</SeactionHeader>
        </Row>
        <Row>
          <OverviewText>{overview}</OverviewText>
        </Row>
        {cast && (
          <Row>
            <SeactionHeader>CAST</SeactionHeader>
          </Row>
        )}
        {cast && <Slider snapWidth={posterSnapWidh} items={renderCast(cast)} seperator />}
        {similar && (
          <Row>
            <SeactionHeader>SIMILAR TV-SHOWS</SeactionHeader>
          </Row>
        )}
        {similar && <Slider snapWidth={posterSnapWidh} items={renderSimilar(similar, navigation)} seperator />}
      </ScreenContainer>
    );
  }
}

export default TvShowDetailScreen;
