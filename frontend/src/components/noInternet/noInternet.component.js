import React from 'react';
import { Icon } from 'expo';
import styled from 'styled-components';
import { Theme } from '../../common';
import { Text, View } from '../../general';

const NoInternetContainer = styled.View`
  position: absolute;
  height: ${Theme.sizes.window.height - Theme.sizes.tabBar.height};
  width: ${Theme.sizes.window.width};
  flex: 1;
  padding-top: ${Theme.sizes.spaces.content.medium.top};
  padding-bottom: ${Theme.sizes.spaces.content.large.bottom};
  background-color: ${Theme.colors.background.dark};
  padding-left: ${Theme.sizes.spaces.window.left};
  padding-right: ${Theme.sizes.spaces.window.right};
  z-index: 9999;
`;

const NoInternet = () => {
  return (
    <NoInternetContainer>
      <View.column justifyContent="center" alignItems="center" stretch>
        <Icon.MaterialCommunityIcons
          style={{ marginBottom: Theme.sizes.text.large }}
          name="wifi-off"
          color={Theme.colors.text.default}
          size={Theme.sizes.text.enormous}
        />
        <Text.body2 color="default">No internet connection is detected</Text.body2>
      </View.column>
    </NoInternetContainer>
  );
}
export default NoInternet;