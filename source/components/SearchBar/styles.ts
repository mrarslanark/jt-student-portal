import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
    tintColor: '#212121',
  },
  input: {
    flex: 1,
  },
});

export default styles;
