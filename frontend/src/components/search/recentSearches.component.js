import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import { Header } from 'react-navigation';
import { getRecentSearches, removeItemFromRecentSearches } from '../../services';
import SearchItem from './searchItem.component';
import { DimSize, MediaLink } from '../../common';
import { navigate } from '../../navigation';

const RecentSearchContainer = styled.View`
  margin-top: ${Header.HEIGHT + DimSize.windowSidesPadding() * 2};
  padding-top: ${DimSize.windowSidesPadding()};
  margin-left: ${DimSize.windowSidesPadding()};
  margin-right: ${DimSize.windowSidesPadding()};
`;

const RecentSearchTitle = styled.Text`
  color: #fefefe;
  font-size: 16;
  text-align: center;
  margin-bottom: ${DimSize.windowSidesPadding()};
`;

class RecentSearches extends PureComponent {
  state = {
    searches: [],
  };

  componentDidMount = () => {
    this.subscription = getRecentSearches().subscribe((searches) => {
      this.clearSubscription();
      this.setState({
        searches: [
          { id: 'flatList_title', textElement: 'Recent Searches' },
          ...searches,
          { id: 'Please_fix_this', textElement: ' ' },
        ].map(elem => ({ ...elem, id: elem.id.toString() })),
      });
    });
  };

  componentWillUnmount = () => {
    this.clearSubscription();
  };

  onReomve = (id) => {
    removeItemFromRecentSearches(id).then(() => {
      const { searches } = this.state;
      const clonedSearches = [...searches];
      this.setState({
        searches: clonedSearches.filter(item => item.id !== id.toString()),
      });
    });
  };

  clearSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  render() {
    const { searches } = this.state;
    return (
      <RecentSearchContainer>
        <FlatList
          keyExtractor={item => item.id}
          data={searches}
          title="Recent Searches"
          renderItem={({ item }) => {
            if (item.textElement) {
              return <RecentSearchTitle key={item.id}>{item.textElement}</RecentSearchTitle>;
            }
            const { id } = item;
            const remove = () => this.onReomve(id);
            const onPress = () => navigate(MediaLink(item));
            return <SearchItem onPress={onPress} key={id} media={item} onRemove={remove} />;
          }}
        />
      </RecentSearchContainer>
    );
  }
}

export default RecentSearches;
