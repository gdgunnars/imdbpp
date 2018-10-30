import React, { PureComponent } from 'react';
import * as Style from './screen.style';
import Trailer from '../components/trailer';
import * as DimSize from '../common/dimensionSize';
import { getTrendingCombined } from '../services';

class MovieScreen extends PureComponent {
  static navigationOptions = {
    title: 'Movies',
    ...Style.NavigationStyle,
  };

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
      <Style.ScreenContainer>
        {testSingleMovie && (
          <Trailer
            src={testSingleMovie.trailer}
            height={DimSize.height('35%')}
            width={DimSize.width('100%')}
          />
        )}
      </Style.ScreenContainer>
    );
  }
}

export default MovieScreen;
