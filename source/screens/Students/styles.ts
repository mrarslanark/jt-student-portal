import {ImageStyle, StyleSheet} from 'react-native';

const searchIcon: ImageStyle = {
  width: 16,
  height: 16,
  resizeMode: 'contain',
  marginRight: 6,
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 4,
    backgroundColor: 'white',
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    ...searchIcon,
    tintColor: 'gray',
  },
  searchIconActive: {
    ...searchIcon,
    tintColor: '#212121',
  },
  input: {
    flex: 1,
  },
});

export default styles;
