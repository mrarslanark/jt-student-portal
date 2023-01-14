import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 12,
  },

  sectionTitle: {
    marginBottom: 16,
    fontSize: 24,
    opacity: 0.6,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statusButton: {
    borderBottomColor: '#13315C',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 0.48,
  },
  statusTextEnabled: {
    color: 'green',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statusTextDisabled: {
    color: 'gray',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default styles;
