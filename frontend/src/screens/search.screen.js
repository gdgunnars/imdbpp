import React, { PureComponent } from 'react';
import SearchResults from '../components/search/searchResults';
import * as Style from './screen.style';

class SearchScreen extends PureComponent {
  static navigationOptions = {
    title: 'Search',
    ...Style.NavigationStyle,
  };

  render() {
    return( 
      <Style.ScreenContainer>
        <SearchResults/>
      </Style.ScreenContainer>
    )
  }
}

export default SearchScreen;
