import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: 'black',
  },
});

export default styles;
