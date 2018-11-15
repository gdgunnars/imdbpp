import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { navigate } from '../../navigation';
import { Theme, DimSize } from '../../common';
import { Text, View } from '../../general';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Theme.colors.background.dark};
`;

const BtnContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${Theme.sizes.spaces.content.large.top};
  padding-top: ${Theme.sizes.spaces.content.medium.top};
  padding-top: ${Theme.sizes.spaces.content.medium.top};
  padding-left: ${Theme.sizes.spaces.window.left};
  padding-right: ${Theme.sizes.spaces.window.right};
  width: ${Theme.sizes.window.width};
`;

const BtnWrapper = styled.TouchableOpacity`
  width: ${Theme.sizes.window.width / 2
    - Theme.sizes.spaces.window.left
    - Theme.sizes.spaces.content.small.left};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 44;
  padding-left: ${Theme.sizes.spaces.content.medium.left};
  padding-right: ${Theme.sizes.spaces.content.medium.right};
  padding-top: ${Theme.sizes.spaces.content.medium.top};
  padding-bottom: ${Theme.sizes.spaces.content.medium.bottom};
  background-color: ${Theme.colors.background.default};
  border-radius: ${DimSize.width('1%')};
`;

export default () => (
  <Container>
    <View.column justifyContent="center" alignItems="center" stretch>
      <Icon.Entypo
        style={{ marginBottom: Theme.sizes.text.large }}
        name="emoji-neutral"
        color={Theme.colors.text.default}
        size={Theme.sizes.text.enormous}
      />
      <Text.body2 color="default">Nothing found</Text.body2>
      <BtnContainer>
        <BtnWrapper onPress={() => navigate({ routeName: 'Camera' })}>
          <Icon.Ionicons
            style={{ marginRight: Theme.sizes.spaces.content.large.left }}
            name="ios-camera"
            color={Theme.colors.text.default}
            size={44}
          />
          <Text.caption>Try again</Text.caption>
        </BtnWrapper>
        <BtnWrapper onPress={() => navigate({ routeName: 'Search' })}>
          <Icon.FontAwesome
            style={{ marginRight: Theme.sizes.spaces.content.large.left }}
            name="search"
            color={Theme.colors.text.default}
            size={28}
          />
          <Text.caption>Back to search</Text.caption>
        </BtnWrapper>
      </BtnContainer>
    </View.column>
  </Container>
);
