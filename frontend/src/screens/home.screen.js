import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as Style from './screen.style';

import Slider from '../components/Slider';
import Backdrop from '../components/backdrop';
import * as DimSize from '../common/dimensionSize';

const TopRatedTitles = styled.Text`
  font-size: ${DimSize.height('2.5%')};
  color: #fefefe;
  padding-top: ${DimSize.contentSidesPadding() * 2.5};
  padding-bottom: ${DimSize.contentSidesPadding() * 2.5};
  padding-left: ${DimSize.windowSidesPadding()};
`;

class HomeScreen extends PureComponent {
  static navigationOptions = {
    title: 'Home',
    ...Style.NavigationStyle,
  };

  render() {
    return (
      <Style.ScreenContainer>
        <Backdrop />
        <TopRatedTitles>TOP RATED TITLES</TopRatedTitles>
        <Slider
          items={[
            // just testing
            {
              key: '1',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg',
            },
            {
              key: '2',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg',
            },
            {
              key: '3',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg',
            },
            {
              key: '4',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg',
            },
            {
              key: '5',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg',
            },
            {
              key: '6',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg',
            },
          ]}
        />
      </Style.ScreenContainer>
    );
  }
}

export default HomeScreen;
