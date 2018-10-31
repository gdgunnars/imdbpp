import React, { PureComponent } from 'react';
import SearchResults from '../components/search/searchResults';
import ScreenContainer from './screen.style';

class SearchScreen extends PureComponent {
  render() {
    return (
      <ScreenContainer>
        <SearchResults />
      </ScreenContainer>
    )
  }
}

export default SearchScreen;
