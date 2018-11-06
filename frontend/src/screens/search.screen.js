import React, { PureComponent } from 'react';
import { from, Subject } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import styled from 'styled-components';
import { Header } from 'react-navigation';
import Search from '../components/search';
import { getSearchResults } from '../services';

const SearchScreenContainer = styled.View`
  flex: 1;
  background-color: #141414;
`;

class SearchScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], showRecentSearch: true };
    this.searchSubject = new Subject();
    this.searchSubjectObserver = this.searchSubject.asObservable();
  }

  queryChange = newQ => this.searchSubject.next(newQ);

  componentDidMount = () => {
    this.subscription = this.searchSubjectObserver
      .pipe(debounceTime(200))
      .pipe(
        map((val) => {
          if (!val || val.trim() === '') {
            this.setState({
              showRecentSearch: true,
            });
          }
          return val.trim();
        }),
      )
      .pipe(switchMap(query => (query ? from(getSearchResults(query)) : [])))
      .subscribe((data) => {
        this.setState({ searchResults: data, showRecentSearch: false });
      });
  };

  componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  render() {
    const { searchResults, showRecentSearch } = this.state;
    return (
      <SearchScreenContainer>
        <Search.SearchInput onSearch={this.queryChange} />
        {!showRecentSearch && <Search.SearchResults searchResults={searchResults} />}
        {showRecentSearch && <Search.RecentSearches />}
      </SearchScreenContainer>
    );
  }
}

export default SearchScreen;
