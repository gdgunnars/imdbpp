import React from 'react';
import { Icon } from 'expo';

const NavigationIcon = ({ iconName, iconSet, color }) => {
  if (iconSet === 'FontAwesome') {
    return <Icon.FontAwesome name={iconName} size={22} color={color} />;
  }
  return <Icon.MaterialCommunityIcons name={iconName} size={24} color={color} />;
};

export default NavigationIcon;
