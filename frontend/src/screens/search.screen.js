import React, { PureComponent } from 'react';
import { from, Subject } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import Search from '../components/search';
import ScreenContainer from './screen.style';
import { getSearchResults } from '../services';

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
      .pipe(debounceTime(300))
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
      <ScreenContainer>
        <Search.SearchInput onSearch={this.queryChange} />
        {!showRecentSearch && <Search.SearchResults searchResults={searchResults} />}
        {showRecentSearch && <Search.RecentSearches />}
      </ScreenContainer>
    );
  }
}

export default SearchScreen;
