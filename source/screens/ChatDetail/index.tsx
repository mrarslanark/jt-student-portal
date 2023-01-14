import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {ChatDetailProps} from '../../navigator/ChatNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {
  addRoom,
  removeActiveRoom,
  RoomType,
  updateMessages,
} from '../../store/slices/chats';
import {Icons} from '../../constants/icons';

const ChatDetail: React.FC<ChatDetailProps> = ({navigation, route}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {avatar, name, studentId} = route.params;
  const currentRoom = useSelector(
    (state: RootState) => state.root.chats.activeRoom,
  );
  const [chat, setChat] = useState(currentRoom?.messages ?? []);

  const handlePop = () => {
    navigation.pop();
    dispatch(removeActiveRoom());
  };

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerTitleStyle: {
        fontSize: 16,
      },
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
          <Pressable onPress={handlePop}>
            <Image source={Icons.Back} style={styles.backNav} />
          </Pressable>
          <Image style={styles.avatar} source={{uri: avatar}} />
        </View>
      ),
    });
  }, []);

  const onSend = useCallback((messages: any = []) => {
    const roomId = `${studentId}**admin`;
    const user = {
      id: studentId,
      name,
      avatar,
    };
    if (currentRoom) {
      const valuesToBeUpdated = {
        roomId,
        messages,
        updatedAt: new Date().toISOString(),
        lastMessage: messages[0].text,
      };
      // Update messages
      dispatch(updateMessages(valuesToBeUpdated));
    } else {
      const room: RoomType = {
        roomId,
        user,
        messages,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastMessage: messages[0].text,
      };
      // Create new room
      dispatch(addRoom(room));
    }
    setChat((prevState: any) => GiftedChat.append(prevState, messages));
  }, []);

  return (
    <GiftedChat
      messages={chat}
      onSend={onSend}
      user={{
        _id: 'admin',
        name: 'Administrator',
      }}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: 6,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  backNav: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 12,
  },
});

export default ChatDetail;
