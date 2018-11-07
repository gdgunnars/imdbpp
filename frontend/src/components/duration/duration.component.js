import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { Theme, DurationFormat } from '../../common';
import { Text } from '../../general';

const DurationContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DurationComponent = ({ duration, type = 'default' }) => (
  <DurationContainer>
    {duration && (
      <Icon.FontAwesome
        style={{ marginRight: Theme.sizes.spaces.content.small.right }}
        name="clock-o"
        size={16}
        color={Theme.colors.background[type]}
      />
    )}
    {duration && <Text.caption color="light">{DurationFormat(duration)}</Text.caption>}
  </DurationContainer>
);

export default DurationComponent;
