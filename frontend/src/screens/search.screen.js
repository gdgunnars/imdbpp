import React, { PureComponent } from 'react';
import { throttle } from 'throttle-debounce';
import SearchResults from '../components/search/searchResults';
import ScreenContainer from './screen.style';
import SearchInput from '../components/search/searchInput';
import { getSearchResults } from '../services';

class SearchScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
    this.searchOnInputThrottled = throttle(500, this.doSearch);
  }

  queryChange = (newQ) => {
    this.setState({ query: newQ }, () => {
      const { query } = this.state;
      this.searchOnInputThrottled(query);
    });
  };

  doSearch = async (query) => {
    try {
      this.searchQuery = getSearchResults(query);
      const data = await this.searchQuery.promise;

      this.setState({ searchResults: data });
      console.log('Data:', data);
    } catch (error) {
      console.log('Error doing search:', error);
    }
  };

  componentWillUnmount = () => {
    if (this.subscription) {
      this.subscription.cancel();
    }
  };

  render() {
    const { searchResults } = this.state;
    return (
      <ScreenContainer>
        <SearchInput onSearch={this.queryChange} />
        <SearchResults searchResults={searchResults} />
      </ScreenContainer>
    );
  }
}

export default SearchScreen;
