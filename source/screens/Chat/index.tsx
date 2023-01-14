import moment from 'moment';
import React, {useEffect, useState} from 'react';
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
import SearchBar from '../../components/SearchBar';
import {ChatsProps} from '../../navigator/ChatNavigator';
import {AppDispatch, RootState} from '../../store';
import styles from './styles';
import {setActiveRoom} from '../../store/slices/chats';

const Chats: React.FC<ChatsProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector((state: RootState) => state.root.chats.rooms);
  const [chatRooms, setChatRooms] = useState(rooms);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText.length > 0) {
      const newData = rooms.filter(item => {
        const {user} = item;
        const name = user.name ? user.name.toLowerCase() : ''.toLowerCase();
        const inputText = searchText.toLowerCase();
        return name.indexOf(inputText) > -1;
      });
      setChatRooms(newData);
    } else {
      setChatRooms(rooms);
    }
  }, [searchText, rooms]);

  const handleNavigation = (item: any) => {
    dispatch(setActiveRoom(item.user.id));
    navigation.navigate('ChatDetail', {
      avatar: item.user.avatar,
      name: item.user.name,
      studentId: item.user.id,
    });
  };

  const sorted = chatRooms
    .slice()
    .sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1));

  return (
    <View style={styles.container}>
      {rooms.length > 0 ? (
        <SearchBar
          onChangeText={setSearchText}
          placeholder={'Search Students'}
          value={searchText}
        />
      ) : null}
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

export default Chats;
