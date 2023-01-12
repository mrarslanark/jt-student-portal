import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

export type StudentItemType = {
  avatar: string;
  first_name: string;
  last_name: string;
  class_id: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  roll_no: string;
  id: string;
};

const StudentItem: React.FC<StudentItemType> = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container}>
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
