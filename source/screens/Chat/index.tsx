import moment from 'moment';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Divider from '../../components/Divider';
import {ChatsProps} from '../../navigator/ChatNavigator';
import {AppDispatch, RootState} from '../../store';
import {setActiveRoom} from '../../store/slices/chats';

const Chats: React.FC<ChatsProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector((state: RootState) => state.root.chats.rooms);

  const handleNavigation = (item: any) => {
    dispatch(setActiveRoom(item.user.id));
    navigation.navigate('ChatDetail', {
      avatar: item.user.avatar,
      name: item.user.name,
      studentId: item.user.id,
    });
  };

  const sorted = rooms
    .slice()
    .sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1));

  return (
    <View style={styles.container}>
      <FlatList
        data={sorted}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => handleNavigation(item)}
              activeOpacity={0.7}
              style={styles.itemContainer}>
              <Image source={{uri: item.user.avatar}} style={styles.avatar} />
              <View style={styles.textContainer}>
                <View style={styles.topTextContainer}>
                  <Text style={styles.name}>{item.user.name}</Text>
                  <Text style={styles.timestamp}>
                    {moment(item.updatedAt).fromNow(false)}
                  </Text>
                </View>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

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

export default Chats;
