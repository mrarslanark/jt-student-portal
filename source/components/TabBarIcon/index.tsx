import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';

export type TabBarIconType = {
  color: string;
  size: number;
  focused: boolean;
  focusedIcon: ImageSourcePropType | undefined;
  icon: ImageSourcePropType | undefined;
};

const TabBarIcon: React.FC<TabBarIconType> = ({
  color,
  size,
  focused,
  focusedIcon,
  icon,
}) => {
  return (
    <Image
      style={{width: size, height: size, tintColor: color}}
      source={focused ? focusedIcon : icon}
    />
  );
};

export default TabBarIcon;
