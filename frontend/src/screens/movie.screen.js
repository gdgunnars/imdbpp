import React, { PureComponent } from 'react';
import * as Style from './screen.style';
import Trailer from '../components/trailer';
import * as DimSize from '../common/dimensionSize';
import * as data from '../dummyData';

const movie = data.getSingleMovie();

class MovieScreen extends PureComponent {
  static navigationOptions = {
    title: 'Movies',
    ...Style.NavigationStyle,
  };

  render() {
    return (
      <Style.ScreenContainer>
        <Trailer
          src={movie.trailer}
          height={DimSize.height('35%')}
          width={DimSize.width('100%')}
        />
      </Style.ScreenContainer>
    );
  }
}

export default MovieScreen;
