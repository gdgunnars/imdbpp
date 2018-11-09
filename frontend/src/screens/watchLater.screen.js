import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { Text, View } from '../general';
import { Theme, MediaLink } from '../common';
import ScreenConainer from './screen.style';
import { getWatchList, toggleItemToWatchList } from '../services';
import SearchListItem from '../components/search/searchItem.component';
import { navigate } from '../navigation';

const WatchLaterContainer = styled.View`
  flex: 1;
  padding-bottom: ${Theme.sizes.statusBar.height + Theme.sizes.navBar.height};
  background-color: ${Theme.colors.background.dark};
`;

const LastItem = styled.View`
  margin-bottom: ${Theme.sizes.spaces.content.large.bottom};
`;

class WatchListScreen extends PureComponent {
  state = {
    watchList: [],
  };

  componentDidMount = () => {
    this.subscription = getWatchList().subscribe((watchList) => {
      this.clearSubscription();
      this.setState({
        watchList,
      });
    });
  };

  componentWillUnmount = () => {
    this.clearSubscription();
  };

  onRemove = (item) => {
    this.subscription = toggleItemToWatchList(item).subscribe((cbItem) => {
      const { watchList } = this.state;
      this.setState({
        watchList: watchList.filter(elem => elem.id !== cbItem.id),
      });
    });
  };

  clearSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  renderWatchList = () => {
    const { watchList } = this.state;
    return watchList.map((item) => {
      const link = () => navigate(MediaLink(item));
      const onRemove = () => this.onRemove(item);
      return (
        <SearchListItem
          key={`${item.type}_${item.id}`}
          media={item}
          onRemove={onRemove}
          onPress={link}
        />
      );
    });
  };
  /*eslint-disable */
  render() {
    const { watchList } = this.state;
    if (!watchList) {
      return (
        <WatchLaterContainer>
          <View.column justifyContent="center" alignItems="center" stretch>
            <Icon.Entypo
              style={{ marginBottom: Theme.sizes.text.large }}
              name="emoji-neutral"
              color={Theme.colors.text.default}
              size={Theme.sizes.text.enormous}
            />
            <Text.body2 color="light">No media has been added</Text.body2>
          </View.column>
        </WatchLaterContainer>
      );
    }
    return (
      <ScreenConainer>
        <View.columnPadding stretch>{this.renderWatchList()}</View.columnPadding>
        <LastItem />
      </ScreenConainer>
    );
  }
}

export default WatchListScreen;
