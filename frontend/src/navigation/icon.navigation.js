import React from 'react';
import { Icon } from 'expo';

const NavigationIcon = ({ name, iconSet, focused }) => {
  const color = focused ? '#fefefe' : 'rgba(255,255,255, 0.48)';
  if (iconSet === 'FontAwesome') {
    return <Icon.FontAwesome name={name} size={24} color={color} style={{ marginBottom: -3 }} />;
  }
  return (
    <Icon.MaterialCommunityIcons name={name} size={24} color={color} style={{ marginBottom: -3 }} />
  );
};

export default NavigationIcon;
