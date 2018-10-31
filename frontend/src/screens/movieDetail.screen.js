import React, { PureComponent } from 'react';
import ScreenContainer from './screen.style';
import Backdrop from '../components/backdrop';
import { getMovieById } from '../services';

/*eslint-disable */
class MovieDetailScreen extends PureComponent {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const { name, score, date, backdrop_path, poster_path, overview } = getMovieById(id);
    return (
      <ScreenContainer>
        <Backdrop
          name={name}
          score={score}
          date={date}
          backdrop_path={backdrop_path}
          poster_path={poster_path}
          overview={`${overview.substr(0, 100).trim()}${overview.length > 100 ? '...' : ''}`}
        />
      </ScreenContainer>
    );
  }
}

export default MovieDetailScreen;
 