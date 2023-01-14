import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

interface ButtonType {
  title: string;
  onPress: () => void | undefined;
}

const Button: React.FC<ButtonType> = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
