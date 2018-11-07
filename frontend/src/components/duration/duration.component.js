import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import * as DimSize from '../../common/dimensionSize';
import Theme from '../../common/theme';

const DurationContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DurationText = styled.Text`
  color: #fefefe;
  font-size: 12;
  padding-left: ${DimSize.width('1.5%')};
`;

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const mins = duration - hours * 60;
  return `${hours > 0 ? `${hours}h` : ''} ${mins}min`;
};

const DurationComponent = ({ duration, type = 'default' }) => (
  <DurationContainer>
    {duration && (
      <Icon.FontAwesome name="clock-o" size={16} color={Theme.colors.background[type]} />
    )}
    {duration && <DurationText>{formatDuration(duration)}</DurationText>}
  </DurationContainer>
);

export default DurationComponent;
