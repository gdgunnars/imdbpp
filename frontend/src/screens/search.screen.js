import React, { PureComponent } from 'react';
import { from, BehaviorSubject, of } from 'rxjs';
import {
  debounceTime, switchMap, map, distinctUntilChanged,
} from 'rxjs/operators';
import styled from 'styled-components';
import Search from '../components/search';
import { getSearchResults } from '../services';

const SearchScreenContainer = styled.View`
  flex: 1;
  background-color: #141414;
`;

class SearchScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], showRecentSearch: true, loading: false };
    const { navigation } = this.props;
    const imgSearchRes = navigation.getParam('imgSearchRes') || '';
    this.searchSubject = new BehaviorSubject(imgSearchRes);
    this.searchSubjectObserver = this.searchSubject.asObservable();
    this.initialQuery = imgSearchRes.query || '';
  }

  queryChange = (newQ) => {
    return this.searchSubject.next(newQ.trim());
  };

  componentDidMount = () => {
    this.subscription = this.searchSubjectObserver
      .pipe(debounceTime(450))
      .pipe(distinctUntilChanged())
      .pipe(
        map((val) => {
          if (typeof val === 'object') {
            return val;
          }
          if (!val || val.trim() === '') {
            this.setState({
              showRecentSearch: true,
            });
          }
          return val.trim();
        }),
      )
      .pipe(switchMap((query) => {
        console.log(typeof query);
        if (query && typeof query === 'string') {
          return from(getSearchResults(query));
        }
        if (query && typeof query === 'object') {
          return of(query);
        }
        return [];
      }))
      .subscribe((data) => {
        console.log(Object.keys(data));
        this.setState({ searchResults: data, showRecentSearch: false });
      });
  };

  componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  render() {
    const { searchResults, showRecentSearch, loading } = this.state;

    return (
      <SearchScreenContainer>
        <Search.SearchInput initialValue={this.initialQuery} onSearch={this.queryChange} />
        {!showRecentSearch && (
          <Search.SearchResults searchResults={searchResults} isLoading={loading} />
        )}
        {showRecentSearch && <Search.RecentSearches />}
      </SearchScreenContainer>
    );
  }
}

export default SearchScreen;
