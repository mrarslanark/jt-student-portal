import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Chats from '../../screens/Chat';
import ChatDetail from '../../screens/ChatDetail';

type ParamList = {
  Chats: {} | undefined;
  ChatDetail: {
    studentId: string;
    name: string;
    avatar: string;
  };
};

export type ChatsProps = NativeStackScreenProps<ParamList, 'Chats'>;
export type ChatDetailProps = NativeStackScreenProps<ParamList, 'ChatDetail'>;

const ChatStackNavigator = createNativeStackNavigator<ParamList>();

const ChatNavigator = () => {
  return (
    <ChatStackNavigator.Navigator>
      <ChatStackNavigator.Screen name="Chats" component={Chats} />
      <ChatStackNavigator.Screen name="ChatDetail" component={ChatDetail} />
    </ChatStackNavigator.Navigator>
  );
};

export default ChatNavigator;
