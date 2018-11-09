import React from 'react';
import styled from 'styled-components';
import NavTabIcon from './icon.tab';
import * as DimSize from '../../common/dimensionSize';

const itemWidth = Math.floor(DimSize.width('100%') / 5);

const NavItemContainer = styled.TouchableOpacity`
  width: ${itemWidth};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const NavItemText = styled.Text`
  color: ${props => props.color};
  font-size: 12;
`;

const getColor = focused => (focused ? '#fefefe' : 'rgba(254,254,254, 0.68)');

const NavtabItem = ({
  title, iconName, iconSet, focused, onPress,
}) => {
  const color = getColor(focused);
  const link = () => onPress({ routeName: title });
  return (
    <NavItemContainer onPress={link}>
      <NavTabIcon iconName={iconName} iconSet={iconSet} color={color} />
      <NavItemText color={color}>{title}</NavItemText>
    </NavItemContainer>
  );
};

export default NavtabItem;
