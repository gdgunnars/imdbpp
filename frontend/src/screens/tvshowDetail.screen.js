import React, { PureComponent } from 'react';
import ScreenContainer from './screen.style';
import Backdrop from '../components/backdrop';
import { getTvShowById } from '../services';

/*eslint-disable */
class TvShowDetailScreen extends PureComponent {
  render() {
    console.log('IM HERHEHRERH');
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const { name, score, date, backdrop_path, poster_path, overview } = getTvShowById(id);
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

export default TvShowDetailScreen;
