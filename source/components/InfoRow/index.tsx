import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Divider from '../Divider';

type InfoRowType = {
  title: string;
  value: string;
};

const InfoRow: React.FC<InfoRowType> = ({title, value}) => {
  return (
    <View>
      <View style={styles.infoRowContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Divider marginVertical={8} />
    </View>
  );
};

export default InfoRow;
