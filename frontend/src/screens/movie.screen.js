import React, { PureComponent } from 'react';
import ScreenContainer from './screen.style';
import * as DimSize from '../common/dimensionSize';
import { getTopRatedMovies } from '../services';
import Podium from '../components/podium';

class MovieScreen extends PureComponent {
  state = {
    topRated: null,
  };

  componentDidMount = async () => {
    try {
      const top = await getTopRatedMovies();
      if (top.length > 0) {
        this.setState({
          topRated: top,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { topRated } = this.state;
    console.log(topRated);
    return (
      <ScreenContainer>
        {topRated && <Podium items={topRated} height={DimSize.height('23%')} />}
      </ScreenContainer>
    );
  }
}

export default MovieScreen;
