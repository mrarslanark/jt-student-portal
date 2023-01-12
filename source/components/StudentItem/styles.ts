import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EEF4ED',
    padding: 16,
  },
  textContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B2545',
  },
  classId: {
    color: '#13315C',
  },
  active: {
    color: 'green',
    alignSelf: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
  },
  disabled: {
    color: 'gray',
    alignSelf: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
  },
});

export default styles;
