import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../constants/icons';
import {ChatDetailProps} from '../../navigator/ChatNavigator';
import {AppDispatch, RootState} from '../../store';
import {
  addRoom,
  removeActiveRoom,
  RoomMessage,
  RoomType,
  setActiveRoom,
  updateMessages,
} from '../../store/slices/chats';
import styles from './styles';

const ChatDetail: React.FC<ChatDetailProps> = ({navigation, route}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {avatar, name, studentId} = route.params;
  const currentRoom = useSelector(
    (state: RootState) => state.root.chats.activeRoom,
  );
  const [chat, setChat] = useState<RoomMessage[]>(currentRoom?.messages ?? []);

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

  const sendAutomatedResponse = () => {
    const isAutomatedResponseAvailable =
      chat.filter(
        (message: RoomMessage) => message._id === 'automated_response',
      ).length === 0;
    if (isAutomatedResponseAvailable) {
      const automatedResponseModel = {
        _id: 'automated_response',
        createdAt: new Date(),
        text: 'This is an Automated Response: Thank you for getting in contact. User will get back when available.',
        user: {
          _id: studentId,
          name: name,
          avatar,
        },
      };
      setChat((prevState: RoomMessage[]) => {
        prevState.push(automatedResponseModel);
        return [...prevState];
      });
    }
  };

  const onSend = (messages: RoomMessage[] = []) => {
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
      dispatch(setActiveRoom(studentId));
    }
    setChat((prevState: RoomMessage[]) =>
      GiftedChat.append(prevState, messages),
    );
    sendAutomatedResponse();
  };

  return (
    <GiftedChat
      messages={chat
        .slice()
        .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))}
      onSend={onSend}
      inverted={true}
      user={{
        _id: 'admin',
        name: 'Administrator',
      }}
    />
  );
};

export default ChatDetail;
