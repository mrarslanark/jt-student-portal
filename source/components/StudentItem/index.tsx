import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

export interface StudentItemType {
  avatar: string;
  first_name: string;
  last_name: string;
  class_id: string;
  active: boolean;
  created_at: number;
  updated_at: number;
  roll_no: string;
  id: string;
  onPress?: () => void | undefined;
}

const StudentItem: React.FC<StudentItemType> = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={props.onPress}>
      <Image source={{uri: props.avatar}} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {props.first_name} {props.last_name}
        </Text>
        <Text style={styles.classId}>
          {props.class_id} | {props.roll_no}
        </Text>
      </View>
      <Text style={props.active ? styles.active : styles.disabled}>
        {props.active ? 'Active' : 'Disabled'}
      </Text>
    </TouchableOpacity>
  );
};

export default StudentItem;
