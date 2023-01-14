import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
  },
  topTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'normal',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
});

export default styles;
