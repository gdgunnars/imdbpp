import React, { PureComponent } from 'react';
import * as Style from './screen.style';

import Slider from '../components/Slider';
import Backdrop from '../components/backdrop';

class HomeScreen extends PureComponent {
  static navigationOptions = {
    title: 'Home',
    ...Style.NavigationStyle
  };

  render() {
    return (
      <Style.ScreenContainer>
        <Backdrop />
        <Slider
          items={[
            // just testing
            {
              key: '1',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg'
            },
            {
              key: '2',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg'
            },
            {
              key: '3',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg'
            },
            {
              key: '4',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg'
            },
            {
              key: '5',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg'
            },
            {
              key: '6',
              poster_path:
                'https://upload.wikimedia.org/wikipedia/en/0/0c/Black_Panther_film_poster.jpg'
            }
          ]}
        />
      </Style.ScreenContainer>
    );
  }
}

export default HomeScreen;
