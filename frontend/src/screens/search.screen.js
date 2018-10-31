import React, { PureComponent } from 'react';
import SearchResults from '../components/search/searchResults';
import ScreenContainer from './screen.style';
import SearchInput from '../components/search/searchInput';

class SearchScreen extends PureComponent {
  render() {
    return (
      <ScreenContainer>
        <SearchInput />
        <SearchResults />
      </ScreenContainer>
    );
  }
}

export default SearchScreen;
