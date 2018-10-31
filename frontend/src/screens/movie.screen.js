import React, { PureComponent } from 'react';
import ScreenContainer from './screen.style';
import Trailer from '../components/trailer';
import * as DimSize from '../common/dimensionSize';
import { getTrendingCombined } from '../services';

class MovieScreen extends PureComponent {
  state = {
    testSingleMovie: null,
  };

  componentDidMount = async () => {
    try {
      const list = await getTrendingCombined();
      if (list.length > 0) {
        this.setState({
          testSingleMovie: list[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { testSingleMovie } = this.state;
    return (
      <ScreenContainer>
        {testSingleMovie && (
          <Trailer
            src={testSingleMovie.trailer}
            poster={testSingleMovie.backdrop_path}
            height={DimSize.height('35%')}
            width={DimSize.width('100%')}
          />
        )}
      </ScreenContainer>
    );
  }
}

export default MovieScreen;
