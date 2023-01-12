import React from 'react';
import {View} from 'react-native';
import styles from './styles';

type DividerType = {
  type?: 'transparent' | 'colored';
  marginVertical?: number;
};

const Divider: React.FC<DividerType> = ({
  type = 'transparent',
  marginVertical = 4,
}) => {
  return <View style={[styles[type], {marginVertical}]} />;
};

export default Divider;
